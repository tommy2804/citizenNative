import { NavigationContainer } from '@react-navigation/native';
import { AccountNavigator } from './accountNavigator';
import { AppNavigator } from './AppNavigator';
export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
