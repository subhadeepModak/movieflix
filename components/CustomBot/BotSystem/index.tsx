import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
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
import CustomBottomSheet from '../BottomSheet';
import {FlatList} from 'react-native-gesture-handler';
import styles from './styles';
import {BottomSheetDefaultFooterProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fetchResponse, onPressSuggestions} from '../helper';
import {API_CONSTANTS_URL} from '../constant';
import {AuthContext} from '../../../AuthContext/AuthContextProvider';
import MenuIcon from '../assets/menu.svg';
import LoadingDots from 'react-native-loading-dots';

type BottomSheetComponentProps = {};

const BotSystem: React.FunctionComponent<BottomSheetComponentProps> = () => {
  const [authState] = useContext(AuthContext);
  const inputRef = useRef(null);
  const flatListRef = useRef(null);
  const inputTextRef = useRef('');
  const sheetRef = useRef();
  const inset = useSafeAreaInsets();
  const {dismissAll} = useBottomSheetModal();
  const [chatData, chatDispatch] = useReducer(botReducer, initialState);
  const Input = Platform.OS === 'ios' ? BottomSheetTextInput : TextInput;
  const data = useMemo(() => chatData.qna, [chatData.qna]);
  const {prePopulatedQuestions} = chatData;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Object.keys(prePopulatedQuestions).length) {
      // api call for pre populated data
      fetch(API_CONSTANTS_URL, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(res => {
          // console.log(res);
          chatDispatch({
            type: 'UPDATE_PRE_POPULATED_QUESTIONS',
            payload: res,
          });
        });
    }

    if (Object.keys(prePopulatedQuestions).length) {
      setTimeout(() => {
        chatDispatch({
          type: 'UPDATE_CONVERSATION',
          payload: {
            role: 'Assistant',
            ...prePopulatedQuestions.initialMsg,
          },
        });
        setIsLoading(false);
      }, 200);
    }
  }, [prePopulatedQuestions]);

  const onSubmit = useCallback(() => {
    if (inputTextRef.current !== '') {
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'user', content: inputTextRef.current},
      });
      // Save to history
      chatDispatch({
        type: 'UPDATE_HISTORY',
        payload: {role: 'user', content: inputTextRef.current},
      });
      fetchResponse(
        chatDispatch,
        inputTextRef,
        inputRef,
        {session_id: 'NS', dealer_code: authState.dealerCode},
        chatData.apiUrl,
        chatData.history,
      );
    }
  }, [authState.dealerCode, chatData.apiUrl, chatData.history]);

  const onPressFab = useCallback(() => {
    sheetRef.current?.present(0);
  }, []);

  const sheetSnapIndexChangeHandler = (currIndex: number) => {
    if (currIndex === -1) {
      sheetRef?.current?.close();
      dismissAll();
    }
  };

  const renderFooter = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
      <BottomSheetFooter
        {...props}
        bottomInset={'0'}
        style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() =>
            onPressSuggestions('menu', chatDispatch, prePopulatedQuestions)
          }>
          <MenuIcon height={18} width={18} />
        </TouchableOpacity>
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
          onPress={onSubmit}
          disabled={chatData.isLoading || chatData.inputDisabled}>
          <Text style={styles.btnText}>{'>'}</Text>
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      chatData.inputDisabled,
      chatData.isLoading,
      onSubmit,
      chatData.apiUrl,
      prePopulatedQuestions,
    ],
  );

  const onPressPromptSuggestion = useCallback(
    async (item: any) => {
      if (!prePopulatedQuestions[item]) {
        inputTextRef.current = item;
        return await onSubmit();
      }

      return onPressSuggestions(item, chatDispatch, prePopulatedQuestions);
    },
    [onSubmit, prePopulatedQuestions],
  );

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <ChatView
          item={item}
          key={item.content}
          onPressHandler={onPressPromptSuggestion}
        />
      );
    },
    [onPressPromptSuggestion],
  );

  if (!authState?.isSignedIn) {
    return null;
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPressFab}>
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
            {chatData.qna.length && !isLoading ? (
              <FlatList
                ref={flatListRef}
                onContentSizeChange={() =>
                  flatListRef.current.scrollToEnd({animate: true})
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
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <LoadingDots size={10} />
              </View>
            )}
          </View>
        </BottomSheetView>
      </CustomBottomSheet>
    </>
  );
};

export default BotSystem;
