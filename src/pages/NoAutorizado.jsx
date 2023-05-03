import { FaFolderMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Button from 'react-bootstrap/Button';

export default function NoExiste() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <FaFolderMinus size={150} />
      <h2>No autorizado.</h2>
      <p>Tu usario no está autorizado para acceder a este recusro.</p>
      <Button
        variant='primary'
        onClick={() => navigate('/', { replace: true })}
        className='mb-2'
      >
        Regresar a Inicio
      </Button>{' '}
      <Button
        variant='outline-primary'
        onClick={() => navigate(-1, { replace: false })}
        className='mb-2'
      >
        a Página Anterior
      </Button>
    </div>
  );
}
