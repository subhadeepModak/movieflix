import React, {useCallback, useReducer, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import {botReducer, initialState} from '../Reducer/reducer';
import ChatView from '../ChatView';
import EmptyScreen from '../BotScreen/EmptyScreen';
import CustomBottomSheet from '../../CustomBottomSheet/CustomBottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

type BottomSheetComponentProps = {};

const BotButton: React.FunctionComponent<BottomSheetComponentProps> = ({
  extraParams,
  apiUrl,
}) => {
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

const styles = StyleSheet.create({
  input: {
    width: '85%',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnText: {fontSize: 16, color: 'white', fontWeight: 'bold'},
  chatContainer: {
    marginTop: 10,
    padding: 10,
    height: '100%',
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    color: 'white',
    shadowColor: 'black',
    overflow: 'hidden',
  },
  submit: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'red',
  },
  inputContainer: {
    borderTopColor: 'black',
    borderTopWidth: 0.5,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    position: 'absolute',
    bottom: 100,
    width: '100%',
  },
  fab: {
    height: 8,
    width: 60,
    backgroundColor: 'black',
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    left: '42%',
    padding: 5,
  },
  container: {
    position: 'relative',
    backgroundColor: 'white',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    width: '100%',
    flex: 1,
  },
  animeBtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default BotButton;
