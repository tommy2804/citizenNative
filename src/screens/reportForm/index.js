import {
  AccountContainer,
  FormInput,
  PersonalContainer,
  Title,
  AccountBackground,
  AccountCover,
  ButtonsContainer,
  CameraButton,
} from './components/Styles';
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import SelectDropdown from 'react-native-select-dropdown';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { addReport } from '../../api';
import LottieView from 'lottie-react-native';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useStorageData } from '../../hooks/fetchAsyncStorage';
let reports = [
  'Potholes and Road Maintenance',
  'Garbage and Waste Management',
  'Street Lighting',
  'Noise Pollution',
  'Someone is blocking the sidewalk',
  'Someone has taken my parking spot',
  'Illegal Dumping and Graffiti',
  'Building Code Violations',
  'Traffic and Parking',
  'Other',
];

const { width, height } = Dimensions.get('window');
const ReportForm = () => {
  const location = useCurrentLocation();
  const user = useStorageData();
  const [reportTitle, setReportTitle] = useState('');
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [isImage, setIsImage] = useState(false);
  const [hasCameraPermission, setHasCameraPermissiion] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const submitForm = async () => {
    const res = await addReport({
      location: { lat: location.latitude, lng: location.longitude },
      reqTitle: reportTitle,
      reqDescription: description,
      ofUser: user?.id,
      reqPhoto: image,
      reqStreet: location?.Address?.street,
    });
    console.log(res);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(photo);

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      setImage(result.assets[0].base64);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermissiion(status === 'granted');
      setHasMediaLibraryPermission(mediaStatus === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <Text>requestion permissions ....</Text>;
  } else if (hasCameraPermission === false || hasMediaLibraryPermission === false) {
    return <Text>No access to camera, please change this in the settings</Text>;
  }

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    console.log(newPhoto.base64);
    setPhoto(newPhoto);
    const reader = new FileReader();
    reader.readAsDataURL(photo.uri);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  if (photo && isImage) {
    let sharePic = async () => {
      shareAsync(photo.uri).then(() => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
          setPhoto(null);
        });
      });
    };
    let savePhoto = async () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(null);
        setImage(photo.base64);
        setIsImage(false);
      });
    };

    return (
      <>
        <AccountBackground source={{ uri: photo.uri }}>
          <ButtonsContainer>
            <CameraButton
              title="Share"
              onPress={sharePic}
              icon={<Icon name="share" type="font-awesome" color="white" size={15} />}
              buttonStyle={[styles.cameraButton, { padding: 10 }]}
            />
            {hasMediaLibraryPermission && (
              <CameraButton
                buttonStyle={[styles.cameraButton, { padding: 10 }]}
                title="Save"
                icon={<Icon name="save" type="font-awesome" color="white" size={15} />}
                onPress={savePhoto}
              />
            )}
            <CameraButton
              buttonStyle={[styles.cameraButton, { padding: 10 }]}
              title="Retake"
              icon={<Icon name="camera" type="font-awesome" color="white" size={15} />}
              onPress={() => {
                setPhoto(null);
                setImage(null);
              }}
            />
            <CameraButton
              buttonStyle={[styles.cameraButton, { padding: 10 }]}
              title="Back"
              icon={<Icon name="Back" type="font-awesome" color="white" size={15} />}
              onPress={() => setIsImage(false)}
              // onPress={() => navigation.navigate('TakePhoto')}
            />
          </ButtonsContainer>
        </AccountBackground>
      </>
    );
  }

  return (
    <>
      {isImage ? (
        <Camera ref={cameraRef} style={styles.container}>
          <View style={styles.containicon}>
            <CameraButton
              icon={<Icon name="camera" type="font-awesome" color="white" size={30} />}
              buttonStyle={[styles.cameraButton, { width: 60, height: 60 }]}
              onPress={takePicture}
            />
          </View>
        </Camera>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
          <AccountBackground>
            <AccountCover>
              <Text>{user?.fullName} thank you for your help.</Text>

              <Title>Report Form</Title>

              <FormInput
                label="what happend"
                value={description}
                placeholder="decripe the problem"
                onChangeText={(descr) => setDescription(descr)}
                multiline={true}
                numberOfLines={4}
              />
              <SelectDropdown
                label="Select a report"
                data={reports}
                search={true}
                buttonStyle={{ width: 200, marginHorizontal: 20 }}
                defaultButtonText="Titles"
                onSelect={(selectedItem, index) => {
                  setReportTitle(selectedItem);
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
              <AccountContainer>
                <PersonalContainer>
                  <View
                    style={[
                      styles.buttonContainer,
                      {
                        height: '100%',
                        width: '100%',
                      },
                    ]}>
                    <Button
                      buttonStyle={{ width: 120, height: 40 }}
                      title="Take Photo"
                      onPress={() => setIsImage(true)}
                    />

                    <Button
                      buttonStyle={{ width: 100, height: 40 }}
                      title="gallery"
                      onPress={pickImage}
                    />
                  </View>
                </PersonalContainer>
                {/* <Text>received your image</Text> */}
                {image && <Text>received your image</Text>}
                <Button
                  buttonStyle={{
                    width: 100,
                    height: 40,
                    backgroundColor: '#20262E',
                    marginTop: 20,
                    borderRadius: 120,
                  }}
                  title="Submit"
                  onPress={submitForm}
                />
              </AccountContainer>
            </AccountCover>
            <View style={styles.animation}>
              <LottieView
                key="thankyou"
                resizeMode="cover"
                autoPlay
                loop
                source={require('../../../assets/animation/thankyou.json')}
              />
            </View>
          </AccountBackground>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default ReportForm;

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
    display: 'flex',
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  animation: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: -50,
  },
});
