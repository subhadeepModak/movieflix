// suggested data structure

export const InitialQuestions = [
  {
    role: 'Assistant',
    content:
      'Welcome, Hi, I am your AI based virtual assistant. I can help you with following things.',
    suggestions: ['Pre-Disbursement', 'Finance', 'Post-Disbursement'],
  },
];
export const initialState = {
  qna: InitialQuestions,
  isLoading: false,
  inputDisabled: true,
  history: [],
  apiUrl: null,
};
interface State {
  qna: any;
  isLoading: boolean;
  inputDisabled: boolean;
  history: any;
  apiUrl: string;
}

// Define the action types
type Action =
  | {type: 'UPDATE_CONVERSATION'; payload: {role: String; content: String}}
  | {type: 'RESET_CONVERSATION'}
  | {type: 'RESPONSE_LOADING'; payload: boolean}
  | {type: 'UPDATE_INPUT_ENABLED_STATUS'; payload: boolean}
  | {type: 'UPDATE_HISTORY'; payload: any}
  | {type: 'UPDATE_TARGET_API'; payload: any}
  | {type: 'RESET_HISTORY'};

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
        history: [],
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
    case 'UPDATE_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case 'RESET_HISTORY':
      return {
        ...state,
        history: [],
      };
    case 'UPDATE_TARGET_API':
      return {
        ...state,
        apiUrl: action.payload,
      };

    default:
      return state;
  }
};
