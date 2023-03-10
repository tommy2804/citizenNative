import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import ImagePicker from 'react-native-image-picker';

const Test = () => {
  const selectPhoto = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);
    console.log('object');
    // console.log('response', response);
    if (response.canceled) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const uri = response.uri;
      const type = response.type;
      const name = response.fileName;
      const source = {
        uri,
        type,
        name,
      };

      console.log('source', source);
    }
  };
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg',
          }}
          style={styles.backgroundImage}></Image>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>ImagePicker to Cloudinary</Text>
        <TouchableOpacity onPress={selectPhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
    marginBottom: 20,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
  },
  uploadButton: {
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
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
  },
});
export default Test;
