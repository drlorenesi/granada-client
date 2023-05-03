import { useQuery } from 'react-query';
import api from '../api/granada-api';

// 1. Get Ventas por Canal
export const useGetVentasPorCanal = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'ventasCanal',
    () =>
      api.get(
        `/reportes/ventas/canal?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
      ),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
      retry: false,
    }
  );
};

// 2. Get Ventas por Producto
export const useGetVentasPorProducto = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'ventasProducto',
    () =>
      api.get(
        `/reportes/ventas/producto?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
      ),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
      retry: false,
    }
  );
};

// 3. Get Ventas por Categría
export const useGetVentasPorCategoria = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'ventasCategoria',
    () =>
      api.get(
        `/reportes/ventas/categoria?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
      ),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
      retry: false,
    }
  );
};

// 4. Get Ventas por Unidades Mensuales
export const useGetVentasPorUnidades = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'ventasUnidades',
    () =>
      api.get(
        `/reportes/ventas/unidades-mensuales?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
      ),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
      retry: false,
    }
  );
};
