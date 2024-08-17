// suggested data structure
export const initialState = {
  qna: [],
  isLoading: false,
};
interface State {
  qna: any;
  isLoading: boolean;
}

// Define the action types
type Action =
  | {type: 'UPDATE_CONVERSATION'; payload: {role: String; content: String}}
  | {type: 'RESET_CONVERSATION'}
  | {type: 'RESPONSE_LOADING'; payload: boolean};

export const botReducer = (state: State, action: Action) => {
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
    case 'RESPONSE_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
