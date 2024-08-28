import React, {createContext, useReducer} from 'react';
import {authReducer, initialState} from './authReducer';

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}: any) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
