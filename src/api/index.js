import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API = axios.create({ baseURL: 'http://10.0.0.16:4001' });

API.interceptors.request.use(async (req) => {
  // before all the request so that we can send the token back to middlware so he can check the specific
  if (await AsyncStorage.getItem('cityzen')) {
    let jsonValue = await AsyncStorage.getItem('citizen');
    jsonValue = JSON.parse(jsonValue);
    req.headers.Authorization = `Bearer ${jsonValue.token}`;
  }
  return req;
});

export const login = async (formData) => await API.post('/auth/login', formData);
export const register = async (formData) => await API.post('/auth/register', formData);
export const addReport = async (formData) => await API.post('/request/newRequest', formData);
export const getReports = async (id) => await API.get(`/request/getCitizenRequests/${id}`);
