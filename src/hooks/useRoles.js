import { useQuery } from 'react-query';
import auth from '../api/auth-api';

// 1. Get Roles
const getRoles = () => {
  return auth.get('/admin/roles');
};

export const useGetRoles = (onSuccess = null, onError = null) => {
  return useQuery('roles', getRoles, {
    onSuccess,
    onError,
  });
};
