import { useMemo, useCallback } from 'react';
import { FaStopCircle } from 'react-icons/fa';
// Bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// Components
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Data Table
import DataTable from '../../components/DataTable';
// Queries
import { useGetSesiones, useEliminar } from '../../queries/useAdmin';
// Utils
import { formatDateMed } from '../../utils/formatUtils';

export default function Sesiones() {
  const { isLoading, isError, error, data } = useGetSesiones();
  const { mutateAsync: eliminar } = useEliminar();

  const handleEliminar = useCallback(
    async (id) => await eliminar(id),
    [eliminar]
  );

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'usuario.nombre',
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.usuario.nombre} {row.original.usuario.apellido}
            </span>
          );
        },
      },
      { Header: 'Role', accessor: 'usuario.role.descripcion' },
      { Header: 'Dispositivo', accessor: 'userAgent' },
      { Header: 'IP', accessor: 'ip' },
      {
        Header: 'Creada',
        accessor: 'createdAt',
        Cell: ({ row }) => formatDateMed(new Date(row.original.createdAt)),
      },
      {
        Header: 'Acciones',
        accessor: 'none',
        Cell: (props) => {
          return (
            <div className='text-nowrap' style={{ textAlign: 'center' }}>
              <OverlayTrigger overlay={<Tooltip>Eliminar sesión</Tooltip>}>
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => handleEliminar(props.row.original._id)}
                >
                  <FaStopCircle />
                </Button>
              </OverlayTrigger>
            </div>
          );
        },
      },
    ],
    [handleEliminar]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  return (
    <>
      <h2>Sesiones</h2>
      <p>Sesiones activas en el sistema.</p>
      {data && <DataTable columns={columns} data={data.data} footer={false} />}
    </>
  );
}
