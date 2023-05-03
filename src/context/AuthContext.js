// Context
import { createContext, useContext } from 'react';
// Context Utils
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
// API
import api from '../api/auth-api';

const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const { value: auth, setValue: setAuth } = useLocalStorage(
    'sessionInfo',
    null
  );

  const useLogin = () => {
    return useMutation((data) => api.post('login', data), {
      onSuccess: (data) => {
        const sessionInfo = data.headers['session-info'];
        setAuth(sessionInfo);
        toast.success('Sesión iniciada!');
        navigate(from);
      },
    });
  };

  // @route: route to redirect onSuccess
  const useLogout = (route) => {
    return useMutation(() => api.get('logout'), {
      onSuccess: () => {
        setAuth(null);
        toast.success('Sesión terminada.');
        navigate(route, { replace: true });
      },
      onError: () => {
        toast.error('No fue posible terminar la sesión.');
      },
    });
  };

  // @route: route to redirect onSuccess
  const useRegistro = (route) => {
    return useMutation((data) => api.post('registro', data), {
      onSuccess: () => {
        navigate(route);
      },
    });
  };

  // @route: route to redirect onSuccess
  const useSolicitar = (route) => {
    return useMutation((data) => api.post('solicitar', data), {
      onSuccess: () => {
        navigate(route);
      },
    });
  };

  // @route: route to redirect onSuccess
  const useReinicio = (route) => {
    return useMutation(
      ({ x, y, data }) =>
        api.post(`reinicio?x=${encodeURIComponent(x)}&y=${y}`, data),
      {
        onSuccess: () => {
          navigate(route);
        },
      }
    );
  };

  const useVerificar = (route) => {
    return useMutation(({ x, y }) => api.get(`verificar?x=${x}&y=${y}`), {
      onSuccess: () => {
        navigate(route);
      },
    });
  };

  const useAuthCheck = (enabled) => {
    return useQuery('checkAuth', () => api.get('utils/check'), {
      enabled,
      onSuccess: (data) => {
        console.log('useAuthCheck ran', enabled);
        // update local sessionInfo in local storage
        const sessionInfo = data.headers['session-info'];
        console.log(sessionInfo);
        setAuth(sessionInfo);
      },
      onError: (err) => {
        if (err.response?.status === 401) {
          setAuth(null);
          toast.error('Tu sesión no se encuentra activa.');
          // Redirect them to the /login page, but save the current location they were
          // trying to go to when they were redirected. This allows us to send them
          // along to that page after they login, which is a nicer user experience
          // than dropping them off on the home page.
          navigate('/login', { replace: true, state: { from: location } });
        }
      },
      retry: (failureCount, err) =>
        err.response?.status === 404 && failureCount < 2 ? true : false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        useLogin,
        useLogout,
        useRegistro,
        useSolicitar,
        useReinicio,
        useVerificar,
        useAuthCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the Context in other components.
// - With this hook, only 1 import statement is needed in any component:
// import { useAuth } from '../context/AuthContext';
// - It can then be used in your component as:
// const { auth, useLogin } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Not inside AuthContext.');
  return context;
};
