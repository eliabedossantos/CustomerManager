import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/Login';
import { RootStackParamList } from './navigation/types';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="Login" component={LoginScreen} />
    </NativeStack.Navigator>
  );
}