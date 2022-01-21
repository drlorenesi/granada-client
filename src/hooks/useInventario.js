import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Get Tipos de Inventario
const getTiposInventario = () => {
  return api.get(`/inventario/tipos`);
};

export const useGetTiposInventario = (
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('tiposInventario', getTiposInventario, {
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};

// 2. Get Divisiones de Inventario
const getDivisionesInventario = () => {
  return api.get(`/inventario/divisiones`);
};

export const useGetDivisionesInventario = (
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('divisionesInventario', getDivisionesInventario, {
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
  });
};

// 3. Get Productos
const getProductos = (tipo, estatus) => {
  return api.get(`/inventario/productos?tipo=${tipo}&estatus=${estatus}`);
};

export const useGetProductos = (
  enabled = true,
  tipo,
  estatus,
  onSuccess = null,
  onError = null
) => {
  return useQuery(
    ['productos', tipo, estatus],
    () => getProductos(tipo, estatus),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    }
  );
};

// 4. Get Producto
const getProducto = (id) => {
  return api.get(`/inventario/productos/${id}`);
};

export const useGetProducto = (id, onSuccess = null, onError = null) => {
  return useQuery(['productos', id], () => getProducto(id), {
    onSuccess,
    onError,
  });
};
