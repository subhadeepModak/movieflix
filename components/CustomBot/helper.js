import {Platform} from 'react-native';
import {Buffer} from 'buffer';

import {
  HEADERS,
  MENU_OPTIONS,
  NESTED_SUGGESTIONS,
  SUGGESTED_QUESTIONS_LIST,
  SUGGESTIONS,
  TARGET_API_ENDPOINTS,
} from './constant';

const getHistoryContent = (data, type) => {
  // image and table response ignored

  if (type === 'string') {
    return data;
  }

  if (type === 'table') {
    return JSON.stringify(data);
  }

  return '';
};

// Convert Blob to Base64 using FileReader equivalent
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    // Read blob as ArrayBuffer
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      // Convert ArrayBuffer to Base64
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      // console.log(base64);
      resolve(`data:image/png;base64,${base64}`); // Adjust MIME type if necessary
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

export const fetchResponse = async (
  chatDispatch,
  inputTextRef,
  inputRef,
  extraParams,
  apiUrl,
  history,
) => {
  if (!apiUrl) {
    return null;
  }

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
      history: JSON.stringify(history),
      query: inputVal,
    }),
    headers: HEADERS,
    timeout: 120000,
  })
    .then(async response => {
      const contentType = await response.headers.get('content-type');
      if (contentType === 'image/png') {
        const blobData = await response.blob();
        const base64Data = await blobToBase64(blobData);
        // console.log(base64Data);
        if (Platform.OS === 'ios') {
          // On iOS, you can use the native Blob constructor

          const imageObjectURL = URL.createObjectURL(blobData);
          return {type: 'image', content: {src: imageObjectURL}};
        } else {
          return {
            type: 'image',
            content: {src: base64Data},
          };
        }
      }
      return response.json();
    })
    .then(data => {
      const {content, type} = data || {};
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          role: 'assistant',
          content: content || 'Something is wrong. Please retry.',
        },
      });

      chatDispatch({
        type: 'UPDATE_HISTORY',
        payload: {role: 'assistant', content: getHistoryContent(content, type)},
      });
    })
    .catch(e => {
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'assistant', content: `Error from server: ${e}`},
      });
    })
    .finally(() => {
      chatDispatch({
        type: 'RESPONSE_LOADING',
        payload: false,
      });
    });
};

export const onPressSuggestions = async (item, chatDispatch) => {
  if (TARGET_API_ENDPOINTS?.[item]) {
    chatDispatch({
      type: 'UPDATE_TARGET_API',
      payload: TARGET_API_ENDPOINTS[item],
    });
  }

  setTimeout(
    () =>
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'user', content: item},
      }),
    100,
  );

  setTimeout(() => {
    if (SUGGESTIONS[item]) {
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'Assistant', ...SUGGESTIONS[item]},
      });
      chatDispatch({
        type: 'UPDATE_INPUT_ENABLED_STATUS',
        payload: true,
      });
      chatDispatch({type: 'RESET_HISTORY'});
    } else {
      if (NESTED_SUGGESTIONS?.[item]) {
        chatDispatch({
          type: 'UPDATE_CONVERSATION',
          payload: {role: 'Assistant', ...NESTED_SUGGESTIONS[item]},
        });
      } else if (!SUGGESTED_QUESTIONS_LIST.includes(item)) {
        chatDispatch({
          type: 'UPDATE_CONVERSATION',
          payload: {
            role: 'Assistant',
            content: `Now you can ask questions regarding ${item}.`,
          },
        });
      }
      chatDispatch({
        type: 'UPDATE_INPUT_ENABLED_STATUS',
        payload: false,
      });
    }
  }, 500);
};
