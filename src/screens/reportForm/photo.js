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
  ButtonsContainer,
  CameraButton,
} from './components/Styles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';

const { width, height } = Dimensions.get('window');

const TakePhoto = ({ route }) => {
  const { setPhoto, photo } = route.params;
  const cameraRef = useRef(null);
  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    setPhoto(newPhoto);
    console.log(photo);
  };

  return (
    <>
      {/* <Camera ref={cameraRef} style={styles.container}>
        <View style={styles.containicon}>
          <CameraButton
            icon={<Icon name="camera" type="font-awesome" color="white" size={30} />}
            buttonStyle={[styles.cameraButton, { width: 60, height: 60 }]}
            onPress={takePicture}
          />
        </View>
      </Camera> */}
    </>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  camera: {
    flex: 1,
    width,
    height,
  },
  cameraButton: {
    alignSelf: 'center',
    backgroundColor: '#BDCDD6',
    borderRadius: 120,
    width: 80,
  },
  image: {
    alignSelf: 'stretch',
    flex: 1,
    width: 200,
    height: 200,
  },
  containicon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
