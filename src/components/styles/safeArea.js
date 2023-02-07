import { StatusBar, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../theme';
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${theme.colors.bg.primary};
`;
