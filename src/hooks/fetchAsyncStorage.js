import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { useEffect, useState } from 'react';
const { setItem, getItem } = useAsyncStorage('citizen');

export const useStorageData = () => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const readItemFromStorage = async () => {
      const item = await getItem();
      setValue(JSON.parse(item));
    };

    readItemFromStorage();
    return () => setValue(null);
  }, []);
  if (value !== null) return value;
};
