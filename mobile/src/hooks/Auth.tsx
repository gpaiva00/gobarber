import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  FC,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
  const [signInData, setSignInData] = useState<SignInData>({} as SignInData);

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    // const { user, token } = response.data;
    const user = { name: 'Gabriel Paiva', email: 'paivadepaiva00@gmail.com' };
    const token = '123asd';

    setSignInData({ user, token });

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setSignInData({} as SignInData);
  }, []);

  const providerValue = {
    user: signInData.user,
    signIn,
    signOut,
  };

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token && user) setSignInData({ token, user: JSON.parse(user) });
    }

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
