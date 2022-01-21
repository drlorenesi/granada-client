import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Get Roles
const getRoles = () => {
  return api.get('/admin/roles');
};

export const useGetRoles = (
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('roles', getRoles, {
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};
