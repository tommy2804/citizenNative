import { useQuery } from 'react-query';
import { API } from '../api';

export const useAxios = (url, inspectorId = '', methods = '') => {
  const { isLoading, data, error } = useQuery('reports', () =>
    API.get(`/request/${url}${inspectorId}${methods}`).then((res) => res)
  );
  if (isLoading) return 'Loading...';
  if (error) return `you have got an error: ${error.message}`;
  return data;
};
