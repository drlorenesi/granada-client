import { useQuery } from 'react-query';
import api from '../api/granada-api';

// 1. Get Roles
export const useGetRoles = () => {
  return useQuery('roles', () => api.get('/admin/roles'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
