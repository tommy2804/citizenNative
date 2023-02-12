import {
  AccountContainer,
  FormInput,
  Spacer,
  Title,
  AccountBackground,
  AccountCover,
  ButtonsContainer,
  CameraButton,
} from './components/Styles';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
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
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useStorageData } from '../../hooks/fetchAsyncStorage';
import { Ionicons } from '@expo/vector-icons';

let reports = ['Parking', 'Garbage', 'Sewerage', 'Noise', 'A hazard in the street', 'Other'];

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
  const baseUrl = 'https://api.cloudinary.com/v1_1/dyzpajqfj/image/upload';
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async () => {
    console.log('object');
    if (reportTitle.length < 1 || description.length < 1) {
      Alert.alert('Error', 'Cannot Submit Empty Form');
      return;
    }
    const res = await addReport({
      location: { lat: location.latitude, lng: location.longitude },
      reqTitle: reportTitle,
      reqDescription: description,
      ofUser: user?.id,
      reqPhoto: image,
      reqStreet: location?.Address?.street,
    });
    // navigate to home if secceed and if not alert the error
    if (res.status === 201) {
      console.log(res.data);
      Alert.alert('Success', 'Your report has been sent');
      navigation.navigate('main');
    } else {
      Alert.alert('Error', res.data.message);
    }
  };
  const takePicture = async () => {
    let options = {
      allowsEditing: true,
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    const base64 = `data:image/jpg;base64,${newPhoto.base64}`;
    const uri = newPhoto.uri;
    setPhoto(uri);
    const data = {
      file: base64,
      upload_preset: 'cityhero',
    };
    setIsLoading(true);
    await fetch(baseUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async (r) => {
        setIsLoading(false);
        let data = await r.json();
        console.log(data.secure_url);
        setImage(data.secure_url);

        return;
      })

      .catch((err) => console.log(err));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);
    // console.log('response', response);
    if (response.canceled) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const base64 = `data:image/jpg;base64,${response.assets[0].base64}`;
      const uri = response.assets[0].uri;
      setPhoto(uri);
      const data = {
        file: base64,
        upload_preset: 'cityhero',
      };
      await fetch(baseUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (r) => {
          let data = await r.json();
          console.log(data.secure_url);
          setImage(data.secure_url);
          return;
        })
        .catch((err) => console.log(err));
    }
  };
  // request permissions
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

  if (photo) {
    let sharePic = async () => {
      shareAsync(photo.uri).then(() => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
          setPhoto(null);
          setIsImage(false);
        });
      });
    };
    let savePhoto = async () => {
      MediaLibrary.saveToLibraryAsync(photo).then(() => {
        setIsImage(false);
        setPhoto(null);
      });
    };

    return (
      <>
        <AccountBackground source={{ uri: photo }}>
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
            <Title>Report Form</Title>
            <AccountCover>
              <Spacer size={'40px'} />
              <SelectDropdown
                label="Select a report"
                data={reports}
                search={true}
                buttonStyle={{ width: 200, marginHorizontal: 20 }}
                defaultButtonText="Specify the problem"
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

              {/* <AccountContainer> */}
              <Spacer size={'20px'} />
              <Text style={{ alignSelf: 'center', fontSize: '18px' }}>Upload Photo</Text>
              <View style={[styles.buttonContainer]}>
                <Button
                  buttonStyle={[styles.uploadButton, { width: 120, height: 40 }]}
                  title="Take Photo"
                  onPress={() => setIsImage(true)}
                />
                {isLoading && (
                  <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="black" />
                  </View>
                )}

                {image && (
                  <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <Ionicons name="checkmark-sharp" size={34} color="black" />
                    <Text style={{ fontSize: '10px' }}>received your image</Text>
                  </View>
                )}
                <Button
                  buttonStyle={[styles.uploadButton, { width: 100, height: 40 }]}
                  title="gallery"
                  onPress={pickImage}
                />
              </View>

              {/* <Text>received your image</Text> */}
              {image && <Text>received your image</Text>}
              {/* </AccountContainer> */}
              <Spacer size={'20px'} />

              <FormInput
                label="What happend"
                value={description}
                placeholder="describe the problem"
                onChangeText={(descr) => setDescription(descr)}
                multiline={true}
                numberOfLines={4}
              />
              <Spacer size={'20px'} />
              <Text>{user?.fullName} thank you for your help.</Text>
            </AccountCover>

            {/* <View style={styles.animation}>
                <LottieView
                  key="thankyou"
                  resizeMode="cover"
                  autoPlay
                  loop
                  source={require('../../../assets/animation/thankyou.json')}
                />
              </View> */}
          </AccountBackground>
          <Spacer size={'50px'} />
          <View style={styles.uploadContainer}>
            <TouchableOpacity onPress={submitForm} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Send Report</Text>
            </TouchableOpacity>
          </View>
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
    width: 100,
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
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    width: Dimensions.get('window').width - 60,
    margin: 20,
  },
  animation: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 10,
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#93BFCF',
  },

  submitButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#20262E',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: -65,
    width: Dimensions.get('window').width,
    height: 200,
    marginBottom: 20,
  },
});
