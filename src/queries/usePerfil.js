import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import api from '../api/granada-api';

// 1. Obtener Perfil
export const useGetPerfil = (enabled = true) => {
  return useQuery('perfil', () => api.get('/perfil'), {
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// 2. Actualizar Contraseña
export const usePostPass = () => {
  return useMutation((data) => api.post('/cambio-pass', data), {
    // Tradicional
    onSuccess: (data) => {
      toast.success('Contraseña actualizada!');
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error(error.response?.data?.mensaje);
      } else {
        toast.error('No fue posible actualizar tu contraseña.');
      }
    },
  });
};

// 3. Actualizar Perfil
export const usePutPerfil = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => api.put('/perfil', data), {
    // Opcion A - Tradicional
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries('perfil');
    //   toast.success('Perfil actualizado!');
    // },
    // onError: (error) => {
    //   toast.error('No fue posible actualizar tu perfil.');
    // },
    // NOTA: Opciones B & C serviran únicamente si el recurso ha sido "poblado"
    // Opción B - Actualizar después de 'onSuccess' (sin enviar una solicitud de red adicional)
    onSuccess: (data) => {
      queryClient.setQueryData('perfil', (oldData) => {
        return {
          ...oldData,
          data: data.data,
        };
      });
      toast.success('Perfil actualizado!');
    },
    onError: (error) => {
      toast.error('No fue posible actualizar tu perfil.');
    },
    // Opción C - Optimistic update
    // onMutate: async (data) => {
    //   await queryClient.cancelQueries('perfil');
    //   const previousData = queryClient.getQueryData('perfil');
    //   queryClient.setQueryData('perfil', (oldData) => {
    //     return {
    //       ...oldData,
    //       data,
    //     };
    //   });
    //   return {
    //     previousData,
    //   };
    // },
    // onSuccess: (data) => {
    //   toast.success('Perfil actualizado!');
    // },
    // onError: (error, data, context) => {
    //   queryClient.setQueryData('perfil', context.previousData);
    //   toast.error('No fue posible actualizar tu perfil.');
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries('perfil');
    // },
  });
};
