import { ImageBackground, View, Text, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button, Input, Card } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export const HomeCover = styled(Card)`
  justifycontent: center;
  display: flex;
  alignitems: center;
  width: 100%;
`;
export const LotieContainer = styled(View)`
  width: 100%;
  height: 100%;
  position: relative;
`;
export const CardHolder = styled(View)`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled(Text)`
  font-size: 21px;
  font-weight: bold;
  color: #86a3b8;
  align-self: center;
  margin-bottom: 10px;
`;
export const Description = styled(Text)`
  font-size: 17px;
  color: #00425a;
`;
export const Content = styled(View)`
  display: flex;
  justify-content: flex-start;
`;
