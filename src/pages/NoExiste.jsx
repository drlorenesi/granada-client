import { TbError404 } from 'react-icons/tb';
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
      <TbError404 size={175} />
      <h2>No Existe...</h2>
      <p>El recurso que buscas no existe.</p>
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
