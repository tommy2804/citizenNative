import {
  FormButton,
  AccountContainer,
  FormInput,
  PersonalContainer,
  PersonalInput,
  Title,
  ErrorContainer,
  AccountBackground,
  AccountCover,
} from './components/Styles';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ImagePicker from 'expo-image-picker';

const ReportForm = ({ route }) => {
  const { location } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <AccountBackground>
      <AccountCover>
        <AccountContainer>
          <FormInput />
          <FormInput />
          <PersonalContainer>
            <PersonalInput />
            <PersonalInput />
          </PersonalContainer>
          <PersonalContainer>
            <PersonalInput />
            <PersonalInput />
          </PersonalContainer>
        </AccountContainer>

        <FormInput />
        <FormInput />
        <FormInput />
      </AccountCover>
    </AccountBackground>
  );
};

export default ReportForm;

const styles = StyleSheet.create({});
