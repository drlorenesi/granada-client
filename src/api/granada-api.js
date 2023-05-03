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
    toast.error(
      'Ocurrió un error inesperado. Por for intenta tu solicitud de nuevo mas tarde.'
    );
    // Enviar información de error a administrador
    console.log('Enviando error a administrador...', error);
  }
  // B. Errores esperados
  // 1. Solicitudes no autenticadas (redireccionar a login)
  if (error.response?.status === 401) {
    localStorage.removeItem('sessionInfo');
    // Llevar a página que indica que sesión caducó?
    window.location.replace('/login');
  }
  // 2. Solicitudes no autorizadas (redireccionar a inicio)
  if (error.response?.status === 403) {
    toast.error('No tienes permiso para acceder al recurso');
    setTimeout(() => {
      window.location.replace('/');
    }, 1000);
  }
  return Promise.reject(error);
});

export default config;
