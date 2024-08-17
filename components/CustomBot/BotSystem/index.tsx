import React, {useCallback, useMemo, useReducer, useRef, useState} from 'react';
import {
  Pressable,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {botReducer, initialState} from '../Reducer/reducer';
import ChatView from '../ChatView';
import EmptyScreen from '../BotScreen/EmptyScreen';
import CustomBottomSheet from '../CustomBottomSheet/CustomBottomSheet';
import {GestureHandlerRootView, FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {HEADERS} from '../constant';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

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
  const ref = useRef(null);
  const [chatData, chatDispatch] = useReducer(botReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const data = useMemo(() => chatData.qna, [chatData.qna]);

  const fetchResponse = async () => {
    chatDispatch({
      type: 'RESPONSE_LOADING',
      payload: true,
    });

    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        ...extraParams,
        history: JSON.stringify(chatData.qna),
        query: inputValue,
      }),
      headers: HEADERS,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.response);
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
    setInputValue('');
  };

  const onPressAsk = async () => {
    await chatDispatch({
      type: 'UPDATE_CONVERSATION',
      payload: {role: 'user', content: inputValue},
    });

    await fetchResponse();
  };

  const onPress = useCallback(() =>
    ref?.current?.scrollTo(-SCREEN_HEIGHT * 0.85),
  );

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={require('../Mahindra.png')} style={styles.animeBtn} />
      </TouchableOpacity>

      <GestureHandlerRootView>
        <CustomBottomSheet ref={ref} fixed>
          <SafeAreaView style={styles.container}>
            <Pressable style={styles.fab} onPress={() => onPress()} />

            <View style={styles.chatContainer}>
              {chatData.qna.length ? (
                <FlatList
                  data={data}
                  keyExtractor={(item, index) =>
                    item.content + index.toString()
                  }
                  renderItem={({item}) => (
                    <ChatView item={item} key={item.content} />
                  )}
                  ListFooterComponent={
                    chatData.isLoading ? (
                      <ChatView
                        item={{role: 'assistant', content: 'Loading...'}}
                        key={'loader'}
                        isLoading={chatData.isLoading}
                      />
                    ) : (
                      <View style={{width: '100%', height: 50}} />
                    )
                  }
                  style={{
                    padding: 10,
                  }}
                />
              ) : (
                <EmptyScreen />
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Ask me ..."
                style={styles.input}
                onChangeText={setInputValue}
                value={inputValue}
                editable={!chatData.isLoading}
              />
              <TouchableOpacity
                style={styles.submit}
                onPress={onPressAsk}
                disabled={!inputValue}>
                <Text style={styles.btnText}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </CustomBottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

export default BotSystem;
