import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Obtener Sesiones
const getSesiones = () => {
  return api.get('/admin/sesiones');
};

export const useGetSesiones = (onSuccess = null, onError = null) => {
  return useQuery('sesiones', getSesiones, {
    onSuccess,
    onError,
  });
};

// 2. Obtener Sesión
const getSesion = (id) => {
  return api.get(`/admin/usuarios/${id}`);
};

export const useGetSesion = (id, onSuccess = null, onError = null) => {
  return useQuery(['sesiones', id], () => getSesion(id), {
    onSuccess,
    onError,
  });
};
