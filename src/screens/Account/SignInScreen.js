import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../api';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from './components/accountStyles';
import { Spacer } from '../../components/styles/spacer';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const navigation = useNavigation();
  const { setItem } = useAsyncStorage('citizen');

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
  };

  const onSignInPress = async () => {
    const res = await login({ email, password });

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

  return (
    <AccountBackground>
      <AccountCover />
      <Title variant="caption">Voice Tel Aviv</Title>
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
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              title="Login"
              buttonStyle={{
                backgroundColor: 'rgba(111, 202, 186, 1)',
                borderRadius: 5,
              }}
              onPress={onSignInPress}></AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton
          title="Back"
          mode="contained"
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderRadius: 5,
          }}
          onPress={() => navigation.goBack()}></AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FBFC',
  },
  logo: {
    width: '80%',
    maxWidth: 200,
    maxHeight: 200,
  },
});
