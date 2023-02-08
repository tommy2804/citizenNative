import { StyleSheet, Text, View } from 'react-native';
import { AccountBackground } from '../reportForm/components/Styles';
import React from 'react';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LottieAnimationWrapper } from '../../components/styles/lottieAnimtions';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const GoReportScreen = () => {
  const navigation = useNavigation();
  return (
    <AccountBackground style={{ backgroundColor: '#EEE9DA' }}>
      <LottieAnimationWrapper>
        <LottieView
          key="animation"
          resizeMode="cover"
          autoPlay
          loop
          source={require('../../../assets/animation/man-waiting-car.json')}
          // source={require('../../../../assets/animations/watermelon-lottie.json')}
        />
      </LottieAnimationWrapper>
      <TouchableOpacity onPress={() => navigation.navigate('ReportForm')} style={styles.Button}>
        <Text style={styles.font}>Send Quick Report</Text>
      </TouchableOpacity>
    </AccountBackground>
  );
};

export default GoReportScreen;

const styles = StyleSheet.create({
  Button: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#00425A',
  },
  font: {
    fontSize: 20,
    color: 'white',
  },
});
