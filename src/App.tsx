/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { AuthProvider } from './contexts/AuthContext';
import { CustomerProvider } from './contexts/CustomerContext';

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        _focus: {
          borderColor: 'primary.500',
        },
        outlineWidth: 1,
      },
      sizes: {
        lg: {
          fontSize: 'md',
        },
      },
    },
  },
});

function App() {
  return (
    <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <CustomerProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </CustomerProvider>
        </AuthProvider>
    </NativeBaseProvider>
  );
}

export default App;
