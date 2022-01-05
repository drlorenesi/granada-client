import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import auth from '../api/auth-api';

// 1. Obtener Perfil
const getPerfil = () => {
  return auth.get('/perfil');
};

export const useGetPerfil = (onSuccess = null, onError = null) => {
  return useQuery('perfil', getPerfil, {
    onSuccess,
    onError,
    retry: (failureCount, err) =>
      err?.response?.status === 404 && failureCount < 2 ? true : false,
  });
};

// 2. Actualizar Perfil
const putPerfil = (perfil) => {
  return auth.put('/perfil', perfil);
};

export const usePutPerfil = () => {
  const queryClient = useQueryClient();
  return useMutation(putPerfil, {
    // Opcion A - Tradicional
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries('perfil');
    //   toast.success('Perfil actualizado!');
    // },
    // onError: (error) => {
    //   toast.error('No fue posible actualizar tu perfil.');
    // },
    // NOTA: Opciones B & C serviran únicamente si el 'recurso' ha sido "poblado"
    // Opción B - Actualizar después de 'onSuccess' (sin enviar una solicitud de red adicional)
    // onSuccess: (data) => {
    //   queryClient.setQueryData('perfil', (oldData) => {
    //     return {
    //       ...oldData,
    //       data: data.data,
    //     };
    //   });
    //   toast.success('Perfil actualizado!');
    // },
    // onError: (error) => {
    //   toast.error('No fue posible actualizar tu perfil.');
    // },
    // Opción C - Optimistic update
    onMutate: async (data) => {
      await queryClient.cancelQueries('perfil');
      const previousData = queryClient.getQueryData('perfil');
      queryClient.setQueryData('perfil', (oldData) => {
        return {
          ...oldData,
          data,
        };
      });
      return {
        previousData,
      };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData('perfil', context.previousData);
      toast.error('No fue posible actualizar tu perfil.');
      console.log(error, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries('perfil');
      toast.success('Perfil actualizado!');
    },
  });
};
