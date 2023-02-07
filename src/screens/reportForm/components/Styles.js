import { ImageBackground, View, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button, Input, Card } from 'react-native-elements';
import { theme } from '../../../theme';

const { width, height } = Dimensions.get('window');

export const AccountBackground = styled(ImageBackground).attrs({
  //   source: require('../../../../assets/images/homepage_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #bdcdd6;
`;

export const AccountCover = styled(Card)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.5);
  width: 300px;
  height: 300px;
  padding: ${theme.space[4]};
  margin-top: ${theme.space[2]};
`;

export const FormButton = styled(Button)`
  padding: ${theme.space[2]};
`;

export const FormInput = styled(Input)`
  background-color: rgba(255, 255, 255, 0.5);
  width: 300px;
`;

export const PersonalContainer = styled(View)`
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
`;

export const PersonalInput = styled(Input)`
  background-color: rgba(255, 255, 255, 0.5);
  width: 200px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled(View)`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${theme.space[2]};
  margin-bottom: ${theme.space[2]};
`;