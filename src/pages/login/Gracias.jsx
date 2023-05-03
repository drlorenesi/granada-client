import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Gracias() {
  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>!Gracias por Registrarte 👍!</h2>
        <p className='text-center'>
          Se ha enviado un correo con instrucciones para verificar tu cuenta. En
          cuanto la hayas verificado podrás iniciar sesión.
        </p>
        <Link to='/login'>
          <div className='d-grid'>
            <Button variant='primary'>Regresar</Button>
          </div>
        </Link>
      </div>
    </>
  );
}
