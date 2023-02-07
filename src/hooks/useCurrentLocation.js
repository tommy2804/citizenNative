import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    Address: {
      street: '',
      city: '',
      country: '',
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});

      const fullAddress = await Location.reverseGeocodeAsync({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      });
      // console.log(fullAddress);

      setLocation({
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        Address: {
          country: fullAddress[0]?.country,
          city: fullAddress[0]?.city,
          street: fullAddress[0]?.name,
        },
      });
    })();
    return () => setLocation(null), setErrorMsg(null);
  }, []);
  if (!errorMsg) {
    return location;
  }
  return errorMsg;
};
