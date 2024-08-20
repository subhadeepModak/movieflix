import {HEADERS, SUGGESTIONS} from './constant';

export const fetchResponse = async (
  chatDispatch,
  inputTextRef,
  inputRef,
  extraParams,
  apiUrl,
  history = [],
) => {
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
    .then(data => {
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
  }, 500);
};
