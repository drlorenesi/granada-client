import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Get Roles
const getRoles = () => {
  return api.get('/admin/roles');
};

export const useGetRoles = (onSuccess = null, onError = null) => {
  return useQuery('roles', getRoles, {
    onSuccess,
    onError,
  });
};
