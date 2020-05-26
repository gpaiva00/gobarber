import React, { FC } from 'react';
import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
