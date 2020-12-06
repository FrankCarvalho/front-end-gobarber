import React, { createContext, useCallback, useState } from 'react';
import api from '../service/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignIncredentials{
  email: string;
  password: string;
}

interface AuthContextDate {
  user: object;
  signIn(credentials: SignIncredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if(token && user){
      return { token, user: JSON.parse(user)};
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({token, user});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

