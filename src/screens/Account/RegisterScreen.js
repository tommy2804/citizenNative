import React, { useState, useRef } from 'react';
import { Text } from 'react-native';
import { ActivityIndicator, Colors, Button } from 'react-native-paper';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
  PersonalInput,
  PersonalContainer,
} from './components/accountStyles';
import { Spacer } from '../../components/styles/spacer';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { LottieAnimationWrapper } from '../../components/styles/lottieAnimtions';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';
import { register } from '../../api';
// import { CustomText as Test } from '../../components/styles/customText';
// import { useQuery } from 'react-query';
const genders = ['Male', 'Female', 'Other'];
const ages = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

export const RegisterScreen = () => {
  const phoneInput = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState(null);
  const { setItem } = useAsyncStorage('citizen');
  const navigation = useNavigation();

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
  };

  const onSignUpPress = async () => {
    const res = await register({
      email,
      password,
      firstName,
      lastName,
      Gender,
      age,
      role: 'citizen',
      phoneNumber,
    });

    if (res.status === 201) {
      try {
        console.log(res.data);
        const jsonValue = JSON.stringify(res.data);
        writeItemToStorage(jsonValue);
        navigation.navigate('Settings');
      } catch (e) {
        console.error('not stored');
        // saving error
      }
    }
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const Navigation = useNavigation();

  return (
    <ScrollView>
      <AccountBackground>
        <LottieAnimationWrapper>
          <LottieView
            key="animation"
            resizeMode="cover"
            autoPlay
            loop
            source={require('../../../assets/animation/loaderAnimation.json')}
            // source={require('../../../../assets/animations/watermelon-lottie.json')}
          />
        </LottieAnimationWrapper>
        <AccountCover />

        <Title variant="caption">Voice Tel aviv</Title>
        <AccountContainer>
          <AuthInput
            label="E-mail"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <Spacer size="large">
            <AuthInput
              label="Password"
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(userPass) => setPassword(userPass)}
            />
          </Spacer>

          <PersonalContainer>
            <PersonalInput
              label="First Name"
              value={firstName}
              textContentType="firstName"
              autoCapitalize="none"
              onChangeText={(userPass) => setFirstName(userPass)}
            />
            <PersonalInput
              label="Last Name"
              value={lastName}
              textContentType="lastName"
              autoCapitalize="none"
              onChangeText={(userPass) => setLastName(userPass)}
            />
          </PersonalContainer>
          <PersonalContainer>
            <SelectDropdown
              data={ages}
              search={true}
              buttonStyle={{ width: 140 }}
              defaultButtonText="Your Age"
              onSelect={(selectedItem, index) => {
                setAge(selectedItem);
                console.log(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <SelectDropdown
              label="Gender"
              data={genders}
              search={true}
              buttonStyle={{ width: 140, marginHorizontal: 20 }}
              defaultButtonText="Gender"
              onSelect={(selectedItem, index) => {
                setGender(selectedItem);
                console.log(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </PersonalContainer>
          <Spacer size="large">
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="IL"
              layout="first"
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </Spacer>
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton
                title="Register"
                icon="email"
                mode="contained"
                onPress={onSignUpPress}></AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
        <Spacer size="large">
          <AuthButton title=" Back" mode="outline" onPress={() => Navigation.goBack()}></AuthButton>
        </Spacer>

        <Spacer size="large">
          <Spacer size="large"></Spacer>
        </Spacer>
      </AccountBackground>
    </ScrollView>
  );
};
