// suggested data structure

export const InitialQuestions = [
  {
    role: 'Assistant',
    content:
      'Welcome, Hi, I am your AI based virtual assistant from Mahindra Finance. I can help you with following things.',
    suggestions: ['Pre-Disbursement', 'Finance', 'Post-Disbursement'],
  },
];
export const initialState = {
  qna: InitialQuestions,
  isLoading: false,
  inputDisabled: true,
};
interface State {
  qna: any;
  isLoading: boolean;
  inputDisabled: boolean;
}

// Define the action types
type Action =
  | {type: 'UPDATE_CONVERSATION'; payload: {role: String; content: String}}
  | {type: 'RESET_CONVERSATION'}
  | {type: 'RESPONSE_LOADING'; payload: boolean}
  | {type: 'UPDATE_INPUT_ENABLED_STATUS'; payload: boolean};

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
    case 'UPDATE_INPUT_ENABLED_STATUS':
      return {
        ...state,
        inputDisabled: action.payload,
      };
    default:
      return state;
  }
};
