import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Exito() {
  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>!Enhorabuena 👏!</h2>
        <p className='text-center'>Tu contraseña fue cambiada existosamente.</p>
        <Link to='/login'>
          <div className='d-grid'>
            <Button variant='primary'>Regresar</Button>
          </div>
        </Link>
      </div>
    </>
  );
}
