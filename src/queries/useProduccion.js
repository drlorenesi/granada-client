import { useQuery } from 'react-query';
import api from '../api/granada-api';

// 1. Get Sugerido PT
export const useGetSugeridoPT = (
  enabled = true,
  stock,
  produccion,
  bodegas,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'sugeridoPT',
    () =>
      api.get(
        `/reportes/produccion/sugerido-pt?stock=${stock}&produccion=${produccion}&bodegas=${bodegas}`
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

// 2. Get Sugerido MA
export const useGetSugeridoMA = (
  enabled = true,
  tipo,
  stock,
  entrega,
  bodegas,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'sugeridoMA',
    () =>
      api.get(
        `/reportes/produccion/sugerido-ma?tipo=${tipo}&stock=${stock}&entrega=${entrega}&bodegas=${bodegas}`
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

// 3. Get Unidades Producidas Mensuales
export const useGetProduccionPorUnidades = (
  enabled = true,
  fechaIni,
  fechaFin,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    'produccionUnidades',
    () =>
      api.get(
        `/reportes/produccion/unidades-mensuales?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
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
