import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/home';
import ReportForm from '../screens/reportForm';
import TakePhoto from '../screens/reportForm/photo';
import GoReportScreen from '../screens/queekReport/goReportScreen';
const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen options={{ headerShown: false }} name="main" component={MainScreen} />
    <Stack.Screen name="ReportForm" component={ReportForm} />
  </Stack.Navigator>
);
