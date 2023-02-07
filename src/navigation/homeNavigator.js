import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/home';
import { StyleSheet } from 'react-native';
import { LoginScreen } from '../screens/Account/SignInScreen';
import { AccountScreen } from '../screens/Account/Account';
import ReportForm from '../screens/reportForm';
const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="main" component={MainScreen} />
    <Stack.Screen name="ReportForm" component={ReportForm} />
    <Stack.Screen name="account" component={AccountScreen} />
  </Stack.Navigator>
);
