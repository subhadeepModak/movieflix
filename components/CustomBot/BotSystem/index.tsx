import React, {useCallback, useMemo, useReducer, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import {
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {botReducer, initialState} from '../Reducer/reducer';
import ChatView from '../ChatView';
import EmptyScreen from '../BotScreen/EmptyScreen';
import CustomBottomSheet from '../BottomSheet';
import {FlatList} from 'react-native-gesture-handler';
import styles from './styles';
import {HEADERS} from '../constant';

type BottomSheetComponentProps = {
  apiUrl: string;
  extraParams: Object;
};

const BotSystem: React.FunctionComponent<BottomSheetComponentProps> = ({
  apiUrl,
  extraParams,
}: {
  apiUrl: String;
  extraParams: Object;
}) => {
  const inputRef = useRef(null);
  const inputTextRef = useRef('');
  const sheetRef = useRef();
  const {dismissAll} = useBottomSheetModal();
  const [chatData, chatDispatch] = useReducer(botReducer, initialState);
  const Input = Platform.OS === 'ios' ? BottomSheetTextInput : TextInput;

  const data = useMemo(() => chatData.qna, [chatData.qna]);

  const fetchResponse = async () => {
    chatDispatch({
      type: 'RESPONSE_LOADING',
      payload: true,
    });

    const inputVal = inputTextRef.current;
    inputTextRef.current = '';
    inputRef?.current?.clear();
    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...extraParams,
        history: JSON.stringify(
          chatData.qna.slice(Math.max(chatData.qna.length - 3, 0)),
        ),
        query: inputVal,
      }),
      headers: HEADERS,
    })
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          chatDispatch({
            type: 'UPDATE_CONVERSATION',
            payload: {role: 'assistant', content: data.response},
          });
        }
      })
      .catch(() => {
        chatDispatch({
          type: 'RESPONSE_LOADING',
          payload: false,
        });
      })
      .finally(() => {
        chatDispatch({
          type: 'RESPONSE_LOADING',
          payload: false,
        });
      });
  };

  const onPressAsk = async () => {
    if (inputTextRef.current !== '') {
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'user', content: inputTextRef.current},
      });

      await fetchResponse();
    }
  };

  const onPress = useCallback(() => {
    sheetRef.current?.present(0);
  }, []);

  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter
        {...props}
        bottomInset={'0'}
        style={[
          {
            height: 60,
            backgroundColor: 'white',
          },
          styles.inputContainer,
        ]}>
        <Input
          ref={inputRef}
          placeholder="Ask me ..."
          style={styles.input}
          onChangeText={text => {
            inputTextRef.current = text;
          }}
          defaultValue={inputTextRef.current}
          editable={!chatData.isLoading}
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={onPressAsk}
          disabled={chatData.isLoading}>
          <Text style={styles.btnText}>{'>'}</Text>
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    [inputTextRef?.current],
  );

  const sheetSnapIndexChangeHandler = currIndex => {
    if (currIndex === -1) {
      sheetRef?.current?.close();
      dismissAll();
    }
  };

  const renderItem = useCallback(({item}: any) => {
    return <ChatView item={item} key={item.content} />;
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={require('../Mahindra.png')} style={styles.animeBtn} />
      </TouchableOpacity>
      <CustomBottomSheet
        enablePanDownToClose
        handleStyle={styles.sheetStyle}
        ref={sheetRef}
        snapPoints={['80%', '90%']}
        index={0}
        onChange={sheetSnapIndexChangeHandler}
        footerComponent={renderFooter}>
        <BottomSheetView style={styles.container}>
          <View style={styles.chatContainer}>
            {chatData.qna.length ? (
              <FlatList
                data={data}
                keyExtractor={(item, index) => item.content + index.toString()}
                renderItem={renderItem}
                ListFooterComponent={
                  chatData.isLoading ? (
                    <ChatView
                      item={{role: 'assistant', content: 'Loading...'}}
                      key={'loader'}
                      isLoading={chatData.isLoading}
                    />
                  ) : (
                    <View style={styles.emptyBottomSpace} />
                  )
                }
                style={styles.listStyle}
              />
            ) : (
              <EmptyScreen />
            )}
          </View>
        </BottomSheetView>
      </CustomBottomSheet>
    </>
  );
};

export default BotSystem;
