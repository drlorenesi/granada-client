import { useQueryClient } from 'react-query';
import { useGetSesiones } from '../../hooks/useSesiones';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import DataTable from '../../components/DataTable';
import { formatDateShort } from '../../utils/formatUtils';
import { FaStopCircle } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import api from '../../api/auth-api';
import toast from 'react-hot-toast';

export default function Sesiones() {
  const queryClient = useQueryClient();
  const { isLoading, data, isError, error } = useGetSesiones();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  const handleEliminar = async (id) => {
    await api.delete(`/admin/sesiones/${id}`);
    toast.success('Sesión eliminada.');
    queryClient.invalidateQueries('sesiones');
  };

  // Data Table
  const columns = [
    { Header: 'Nombre', accessor: 'usuario.nombre' },
    { Header: 'Apellido', accessor: 'usuario.apellido' },
    { Header: 'Role', accessor: 'usuario.role.descripcion' },
    { Header: 'Dispositivo', accessor: 'userAgent' },
    { Header: 'IP', accessor: 'ip' },
    {
      Header: 'Creada',
      accessor: 'createdAt',
      Cell: ({ row }) => formatDateShort(new Date(row.original.createdAt)),
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
  ];

  return (
    <>
      <h1>Sesiones</h1>
      <p>Página de sesiones activas.</p>
      {data && <DataTable columns={columns} data={data.data} footer={false} />}
    </>
  );
}
