import { View } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../theme';

export const LottieAnimationWrapper = styled(View)`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 0px;
  padding: ${theme.space[2]};
`;
