import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader';
// Auth Hook
import { useAuth } from '../../context/AuthContext';

export default function Verificar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { useVerificar } = useAuth();

  const [searchParams] = useSearchParams();
  const x = searchParams.get('x');
  const y = searchParams.get('y');

  const { mutateAsync: verificar } = useVerificar('/exito');

  useEffect(() => {
    async function getData() {
      try {
        await verificar({ x, y });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data.mensaje);
        setLoading(false);
      }
    }
    // Cerrar sesión de usuario en caso la tenga abierta
    getData();
  }, [x, y, verificar]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <>
        <div className='login-form'>
          <h2 className='text-center p-2'>Error 😖...</h2>
          <p className='text-center'>{error}</p>
        </div>
        {/* Link para inicio */}
        <p className='text-center'>
          <Link to='/login'>Regresar a inicio.</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>
          ¡Enhorabuena 👏! Tu cuenta ha sido verificada.
        </h2>
        <p className='text-center'>Ahora podrás iniciar sesión.</p>
      </div>
      {/* Link para inicio */}
      <p className='text-center'>
        <Link to='/login'>Regresar a inicio.</Link>
      </p>
    </>
  );
}
