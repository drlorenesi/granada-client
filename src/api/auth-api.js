import axios from 'axios';
import toast from 'react-hot-toast';

const config = axios.create({
  baseURL: process.env.REACT_APP_AUTH,
  withCredentials: true,
});

config.interceptors.response.use(null, (error) => {
  // A. Errores inesperados
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError && !axios.isCancel(error)) {
    // Mostrar menaje de error al usuario
    toast.error('Lo sentimos, ocurrió un error inesperado...');
    // Enviar información de error a administrador
    // console.log('Enviando error a administrador...', error);
  }
  return Promise.reject(error);
});

export default config;
