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
import {HEADERS, SUGGESTIONS} from '../constant';
import {BottomSheetDefaultFooterProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const flatListRef = useRef(null);
  const inputTextRef = useRef('');
  const sheetRef = useRef();
  const inset = useSafeAreaInsets();
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
        // history: JSON.stringify(
        //   // chatData.qna.slice(Math.max(chatData.qna.length - 3, 4)),
        //   [],
        // ),
        history: JSON.stringify([]),
        query: inputVal,
      }),
      headers: HEADERS,
    })
      .then(async response => {
        const contentType = response.headers.get('content-type');
        if (contentType === 'image/png') {
          const blob = await response.blob();
          const imageObjectURL = URL.createObjectURL(blob);
          return {response: {src: imageObjectURL}};
        }
        return response.json();
      })
      .then((data: {response: any}) => {
        if (data?.response) {
          chatDispatch({
            type: 'UPDATE_CONVERSATION',
            payload: {role: 'assistant', content: data.response},
          });
        }
        if (Array.isArray(data)) {
          chatDispatch({
            type: 'UPDATE_CONVERSATION',
            payload: {role: 'assistant', content: data},
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
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
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
          style={[
            styles.input,
            ...(chatData.inputDisabled
              ? [
                  {
                    backgroundColor: '#757472',
                    borderColor: '#dedede',
                  },
                ]
              : []),
          ]}
          onChangeText={(text: any) => {
            inputTextRef.current = text;
          }}
          defaultValue={inputTextRef.current}
          editable={!chatData.inputDisabled}
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={onPressAsk}
          disabled={chatData.isLoading || chatData.inputDisabled}>
          <Text style={styles.btnText}>{'>'}</Text>
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    [inputTextRef?.current, chatData.inputDisabled],
  );

  const sheetSnapIndexChangeHandler = (currIndex: number) => {
    if (currIndex === -1) {
      sheetRef?.current?.close();
      dismissAll();
    }
  };

  const onPressHandler = async (item: string | number) => {
    chatDispatch({
      type: 'UPDATE_CONVERSATION',
      payload: {role: 'user', content: item},
    });
    if (SUGGESTIONS[item]) {
      await chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'Assistant', ...SUGGESTIONS[item]},
      });
    } else {
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          role: 'Assistant',
          content: `Now you can ask questions regarding ${item}.`,
        },
      });
      chatDispatch({
        type: 'UPDATE_INPUT_ENABLED_STATUS',
        payload: false,
      });
    }
  };

  const renderItem = useCallback(({item}: any) => {
    return (
      <ChatView
        item={item}
        key={item.content}
        onPressHandler={onPressHandler}
      />
    );
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={require('../Mahindra.png')} style={styles.animeBtn} />
      </TouchableOpacity>
      <CustomBottomSheet
        topInset={inset.top}
        bottomInset={inset.bottom}
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
                ref={flatListRef}
                onContentSizeChange={() =>
                  flatListRef.current.scrollToEnd({Animated: true})
                }
                data={data}
                keyExtractor={(_, index) => index.toString()}
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
                contentContainerStyle={{paddingBottom: 100}}
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
