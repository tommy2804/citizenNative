import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, mycolors } from '../theme/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AccountNavigator } from './accountNavigator';
import { HomeNavigator } from './homeNavigator';
import { StyleSheet } from 'react-native';
import { ReportNavigator } from './reportNavigator';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    tabBarOptions={{
      activeTintColor: colors.ui.primary,
      inactiveTintColor: colors.brand.muted,
    }}>
    <Tab.Screen
      options={{
        headerBackTitle: 'Back',
        headerStyle: styles.header,
        headerShown: false,

        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="touch-app" size={size} color={color} />
        ),
      }}
      name="Quick Report"
      component={ReportNavigator}
    />
    <Tab.Screen
      options={{
        headerBackTitle: 'Back',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: mycolors.light.white,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="account-balance" size={size} color={color} />
        ),
      }}
      name="My Account"
      component={HomeNavigator}
    />

    <Tab.Screen
      options={{
        headerBackTitle: 'Back',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: mycolors.light.white,
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
      }}
      name="Settings"
      component={AccountNavigator}
    />
  </Tab.Navigator>
);
const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    color: mycolors.light.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: mycolors.light.white,
  },
});
