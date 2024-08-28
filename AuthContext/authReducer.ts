export const initialState = {
  isSignedIn: false,
  dealerCode: null,
};
interface State {
  isSignedIn: boolean;
  dealerCode: string;
}

// Define the action types
type Action =
  | {type: 'UPDATE_AUTHENTICATION_STATUS'; payload: object}
  | {type: 'RESET_AUTHENTICATION_STATUS'};

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_AUTHENTICATION_STATUS':
      return {
        ...action.payload,
      };
    case 'RESET_AUTHENTICATION_STATUS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
