import 'react-native-gesture-handler';

import React, { FC } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';

import Routes from './routes';

const App: FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />
    <View style={{ flex: 1, backgroundColor: '#312e38' }}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </View>
  </NavigationContainer>
);

export default App;
