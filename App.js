import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigations/AppNavigation';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/Redux/configureStore';

const MyTheme = {
  colors: {
    primary: '#64DD17',
    background: '#ffffff',
  },
};

export default function App() {

  const { store } = ConfigureStore();
  
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <AppNavigation />
        </NavigationContainer>
    </Provider>
  );
}
