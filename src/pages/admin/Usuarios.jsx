import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaCheckCircle, FaStopCircle } from 'react-icons/fa';
// Bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
// Components
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Data Table
import DataTable from '../../components/DataTable';
// Queries
import {
  useGetUsuarios,
  useSuspender,
  useRestablecer,
} from '../../queries/useAdmin';
// Utils
import { formatDateMed } from '../../utils/formatUtils';

export default function Usuarios() {
  let navigate = useNavigate();
  const { isLoading, isError, error, data } = useGetUsuarios();
  const { mutateAsync: suspender } = useSuspender();
  const { mutateAsync: restablecer } = useRestablecer();

  const handleEdit = useCallback(
    (id) => navigate(`/admin/usuarios/${id}`),
    [navigate]
  );

  const handleSuspend = useCallback(
    async (id) => await suspender(id),
    [suspender]
  );

  const handleRestablecer = useCallback(
    async (id) => await restablecer(id),
    [restablecer]
  );

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.nombre} {row.original.apellido}
            </span>
          );
        },
      },
      { Header: 'Ext.', accessor: 'extension' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Role', accessor: 'role.descripcion' },
      {
        Header: 'Verificado',
        Cell: ({ row }) => (row.original.verificado ? 'Sí' : 'Pendiente'),
      },
      {
        Header: 'Ingreso Actual',
        Cell: ({ row }) => formatDateMed(new Date(row.original.ingresoActual)),
      },
      {
        Header: 'Estatus',
        Cell: ({ row }) => {
          return row.original.suspendido ? (
            <div style={{ textAlign: 'center' }}>
              <Badge pill bg='danger'>
                Suspendido
              </Badge>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Badge pill bg='success'>
                Activo
              </Badge>
            </div>
          );
        },
      },
      {
        Header: 'Acciones',
        Cell: (props) => {
          return (
            <div className='text-nowrap' style={{ textAlign: 'center' }}>
              <Button
                size='sm'
                variant='primary'
                onClick={() => handleEdit(props.row.original._id)}
              >
                <FaEdit />
              </Button>{' '}
              <OverlayTrigger
                overlay={<Tooltip>Reestablecer a usuario</Tooltip>}
              >
                <Button
                  size='sm'
                  variant='success'
                  onClick={() => handleRestablecer(props.row.original._id)}
                >
                  <FaCheckCircle />
                </Button>
              </OverlayTrigger>{' '}
              <OverlayTrigger overlay={<Tooltip>Suspender a usuario</Tooltip>}>
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => handleSuspend(props.row.original._id)}
                >
                  <FaStopCircle />
                </Button>
              </OverlayTrigger>
            </div>
          );
        },
      },
    ],
    [handleEdit, handleRestablecer, handleSuspend]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  return (
    <>
      <h2>Usuarios</h2>
      <p>Usuarios registrados en el sistema.</p>
      {data && <DataTable columns={columns} data={data.data} footer={false} />}
    </>
  );
}
