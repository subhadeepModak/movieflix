import {
  HEADERS,
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

  return '';
};

export const fetchResponse = async (
  chatDispatch,
  inputTextRef,
  inputRef,
  extraParams,
  apiUrl,
  history,
) => {
  if (!apiUrl) {
    console.log('inFetch er', apiUrl);
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
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        return {type: 'image', content: {src: imageObjectURL}};
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
