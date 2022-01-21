import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Get Ventas por Canal
const getVentasPorCanal = (fechaIni, fechaFin) => {
  return api.get(
    `/reportes/ventas/canal?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
  );
};

export const useGetVentasPorCanal = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery('ventasCanal', () => getVentasPorCanal(fechaIni, fechaFin), {
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};

// 2. Get Ventas por Producto
const getVentasPorProducto = (fechaIni, fechaFin) => {
  return api.get(
    `/reportes/ventas/producto?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
  );
};

export const useGetVentasPorProducto = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'ventasProducto',
    () => getVentasPorProducto(fechaIni, fechaFin),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    }
  );
};

// 3. Get Ventas por Categría
const getVentasPorCategoria = (fechaIni, fechaFin) => {
  return api.get(
    `/reportes/ventas/categoria?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
  );
};

export const useGetVentasPorCategoria = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'ventasCategoria',
    () => getVentasPorCategoria(fechaIni, fechaFin),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    }
  );
};
