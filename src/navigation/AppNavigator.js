import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, mycolors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { AccountNavigator } from './accountNavigator';
import { HomeNavigator } from './homeNavigator';
import { StyleSheet } from 'react-native';

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
        headerTitleStyle: styles.headerTitle,
        headerTintColor: mycolors.light.white,
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
      }}
      name="main"
      component={HomeNavigator}
    />
    <Tab.Screen
      options={{
        headerBackTitle: 'Back',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: mycolors.light.white,
        tabBarIcon: ({ color, size }) => <Ionicons name="shield" size={size} color={color} />,
      }}
      name="Reports"
      component={AccountNavigator}
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
    backgroundColor: mycolors.light.primary,
  },
});
