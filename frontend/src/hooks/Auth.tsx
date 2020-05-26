import React, { createContext, useCallback, useState, useContext, FC } from 'react';
import api from '../services/api';

interface CredentialsProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: object;
  signIn(credentials: CredentialsProps): Promise<void>;
  signOut(): void;
}

interface SignInData {
  user: object;
  token: string;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: FC = ({ children }) => {
  const [signInData, setSignInData] = useState<SignInData>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) return { token, user: JSON.parse(user) };

    return {} as SignInData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    setSignInData({ user, token });

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setSignInData({} as SignInData);
  }, []);

  const providerValue = {
    user: signInData.user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
