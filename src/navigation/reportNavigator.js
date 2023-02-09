import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/home';
import ReportForm from '../screens/reportForm';
import GoReportScreen from '../screens/queekReport/goReportScreen';
const Stack = createNativeStackNavigator();

export const ReportNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen options={{ headerShown: false }} name="main" component={GoReportScreen} />
    <Stack.Screen name="ReportForm" component={ReportForm} />
  </Stack.Navigator>
);
