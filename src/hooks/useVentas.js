import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Get Ventas por Canal
const getVentasPorCanal = (fechaIni, fechaFin) => {
  return api.get(
    `reportes/ventas/canal?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
  );
};

export const useGetVentasPorCanal = (
  enabled,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    ['ventasCanal', fechaIni, fechaFin],
    () => getVentasPorCanal(fechaIni, fechaFin),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    }
  );
};
