import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useGetUsuarios } from '../../hooks/useUsuarios';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import DataTable from '../../components/DataTable';
import { formatDateShort } from '../../utils/formatUtils';
import { FaEdit, FaCheckCircle, FaStopCircle } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import api from '../../api/auth-api';
import toast from 'react-hot-toast';

export default function Usuarios() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data, isError, error } = useGetUsuarios();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  const handleEdit = (id) => {
    navigate(`/admin/usuarios/${id}`);
  };

  const handleSuspend = async (id) => {
    await api.post(`/admin/suspender/${id}`);
    toast.success('Usuario suspendido.');
    queryClient.invalidateQueries('usuarios');
  };

  const handleRestablecer = async (id) => {
    await api.post(`/admin/restablecer/${id}`);
    toast.success('Usuario reestablecido.');
    queryClient.invalidateQueries('usuarios');
  };

  // Data Table
  const columns = [
    { Header: 'Nombre', accessor: 'nombre' },
    { Header: 'Apellido', accessor: 'apellido' },
    { Header: 'Ext.', accessor: 'extension' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role.descripcion' },
    {
      Header: 'Verificado',
      accessor: 'verificado',
      Cell: ({ row }) => (row.original.verificado ? 'Sí' : 'Pendiente'),
    },
    {
      Header: 'Ingreso Actual',
      accessor: 'ingresoActual',
      Cell: ({ row }) => formatDateShort(new Date(row.original.ingresoActual)),
    },
    {
      Header: 'Estatus',
      accessor: 'suspendido',
      Cell: ({ row }) => {
        return row.original.suspendido ? (
          <span style={{ color: 'red' }}>Suspendido</span>
        ) : (
          <span style={{ color: 'green' }}>Activo</span>
        );
      },
    },
    {
      Header: 'Acciones',
      accessor: 'none',
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
            <OverlayTrigger overlay={<Tooltip>Reestablecer a usuario</Tooltip>}>
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
  ];

  return (
    <>
      <h1>Usuarios</h1>
      <p>Página de usuarios registrados</p>
      {data && <DataTable columns={columns} data={data.data} footer={false} />}
    </>
  );
}
