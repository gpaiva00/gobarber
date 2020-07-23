import React, { FC } from 'react';

import { AuthProvider } from './Auth';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
