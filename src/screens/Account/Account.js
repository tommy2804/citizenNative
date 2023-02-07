import React from 'react';
import LottieView from 'lottie-react-native';
import { LottieAnimationWrapper } from '../../components/styles/lottieAnimtions';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from './components/accountStyles';
import { Spacer } from '../../components/styles/spacer';
import { useNavigation } from '@react-navigation/native';

export const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <AccountBackground>
      <AccountCover />

      <LottieAnimationWrapper>
        <LottieView
          key="animation"
          resizeMode="cover"
          autoPlay
          loop
          source={require('../../../assets/animation/userAnimation.json')}
          // source={require('../../../../assets/animations/watermelon-lottie.json')}
        />
      </LottieAnimationWrapper>
      <Spacer size="large">
        <Title variant="caption">Voice Tel Aviv</Title>
      </Spacer>
      <AccountContainer>
        <AuthButton
          title="Login"
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate('Login')}></AuthButton>
        <Spacer size="large">
          <AuthButton
            title="Register"
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate('Register')}></AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
