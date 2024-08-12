// suggested data structure
export const initialState = {
  qna: [
    // {role: 'user', content: 'What is the count of total order in 2023?'},
    // {role: 'assistant', content: 'Total order count in 2023 is 646'},
  ],
};

export const botReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        qna: [...state.qna, action.payload],
      };
    case 'RESET_CONVERSATION':
      return {
        ...state,
        qna: [],
      };
    default:
      return state;
  }
};
