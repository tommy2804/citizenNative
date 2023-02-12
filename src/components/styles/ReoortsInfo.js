import React from 'react';
import { Image, View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { CustomText as Text } from '../../components/styles/customText';
import brokenLight from '../../../assets/images/brokenLight.jpeg';

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const AndroidVied = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled(View)`
  padding: 6px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === 'android';

export const ReportInfo = ({ report = brokenLight, isMap }) => {
  const CustomImage = isAndroid && isMap ? AndroidVied : CompactImage;

  return (
    <Item>
      <CustomImage source={report} />
      <Text center variant="caption">
        a broken light in the street!!!!
      </Text>
    </Item>
  );
};
