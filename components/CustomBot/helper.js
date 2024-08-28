import {Platform} from 'react-native';
import {Buffer} from 'buffer';

import {BASE_API_URL, HEADERS} from './constant';

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

export const onPressSuggestions = async (item, chatDispatch, questions) => {
  if (questions[item]?.endPoint || questions[item]?.endpoint) {
    const endPoint = questions[item]?.endPoint || questions[item]?.endpoint;
    chatDispatch({
      type: 'UPDATE_TARGET_API',
      payload: `${BASE_API_URL}${endPoint}`,
    });
  }
  // update user feed back

  setTimeout(
    () =>
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'user', content: item},
      }),
    100,
  );

  // update assistant suggestion

  setTimeout(() => {
    if (questions[item]) {
      chatDispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {role: 'Assistant', ...questions[item]},
      });
      chatDispatch({type: 'RESET_HISTORY'});
    }
    chatDispatch({
      type: 'UPDATE_INPUT_ENABLED_STATUS',
      payload: !(questions[item]?.enableEditing || false),
    });
  }, 500);
};
