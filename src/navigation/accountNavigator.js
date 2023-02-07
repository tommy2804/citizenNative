import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Account/SignInScreen';
import { RegisterScreen } from '../screens/Account/RegisterScreen';
import { AccountScreen } from '../screens/Account/Account';

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
