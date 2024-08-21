import {HEADERS, SUGGESTIONS, TARGET_API_ENDPOINTS} from './constant';

const getHistoryContent = data => {
  // image and table response ignored
  if (data?.response && data.response.search('blob:') === -1) {
    return data.response;
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
    return null;
  }
  chatDispatch({
    type: 'RESPONSE_LOADING',
    payload: true,
  });
  console.log('History', history);
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
      const contentType = response.headers.get('content-type');
      if (contentType === 'image/png') {
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        return {response: {src: imageObjectURL}};
      }
      // console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
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

      chatDispatch({
        type: 'UPDATE_HISTORY',
        payload: {role: 'assistant', content: getHistoryContent(data)},
      });
    })
    .catch((e) => {
      console.log(e, 'error');
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

export const onPressSuggestions = async (item, chatDispatch) => {
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
      chatDispatch({
        type: 'UPDATE_TARGET_API',
        payload: TARGET_API_ENDPOINTS[item],
      });
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
  }, 500);
};
