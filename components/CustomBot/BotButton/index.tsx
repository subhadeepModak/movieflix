import React, {useCallback, useReducer, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {botReducer, initialState} from '../Reducer/reducer';
import ChatView from '../ChatView';
import EmptyScreen from '../BotScreen/EmptyScreen';
import CustomBottomSheet from '../../CustomBottomSheet/CustomBottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';

type BottomSheetComponentProps = {};

const BotButton: React.FunctionComponent<BottomSheetComponentProps> = ({}) => {
  const ref = useRef(null);
  const [chatData, chatDispatch] = useReducer(botReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const onPressAsk = () => {
    chatDispatch({
      type: 'UPDATE_CONVERSATION',
      payload: {role: 'user', content: inputValue},
    });
    setInputValue('');
  };

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, [ref?.current]);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image
          source={require('../../../assets/bot.gif')}
          style={styles.animeBtn}
        />
      </TouchableOpacity>

      <GestureHandlerRootView>
        <CustomBottomSheet ref={ref}>
          <SafeAreaView style={styles.container}>
            <Pressable style={styles.fab} onPress={() => onPress()} />

            <View style={styles.chatContainer}>
              {chatData.qna.length ? (
                <FlatList
                  data={chatData.qna}
                  renderItem={({item}) => (
                    <ChatView item={item} key={item.content} />
                  )}
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

export default BotButton;
