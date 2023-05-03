import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useSearchParams } from 'react-router-dom';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import Submit from '../../components/formInputs/Submit';
// Auth Hook
import { useAuth } from '../../context/AuthContext';

export default function Reinicio() {
  const [updateError, setUpdateError] = useState(false);
  const [show, setShow] = useState(false);
  const { useReinicio } = useAuth();

  const [searchParams] = useSearchParams();
  const x = searchParams.get('x');
  const y = searchParams.get('y');

  const defaultValues = {
    pass: '',
    confirmPass: '',
  };

  const validationSchema = yup.object({
    pass: yup
      .string()
      .min(4, 'Contraseña no puede ser menor a 4 caracteres.')
      .required('Campo requerido.'),
    confirmPass: yup
      .string()
      .required('Por favor confirma tu contraseña.')
      .oneOf([yup.ref('pass'), null], 'Las contraseñas no concuerdan.'),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync: reinicio } = useReinicio('/exito');

  const onSubmit = async (data) => {
    try {
      await reinicio({ x, y, data });
    } catch (err) {
      setUpdateError(err.response.data?.mensaje);
      setShow(true);
    }
  };

  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>Ingresa tu nueva contraseña</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Pass */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='pass'
              type='password'
              placeholder='Contraseña'
            />
          </Form.Group>
          {/* Confirmar Pass */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='confirmPass'
              type='password'
              placeholder='Confirma tu contraseña'
            />
          </Form.Group>
          {/* Error de registro */}
          {updateError && show && (
            <Alert
              className='text-center'
              variant='danger'
              onClose={() => setShow(false)}
              dismissible
            >
              {updateError}
            </Alert>
          )}
          <div className='d-grid'>
            <Submit name='Cambiar contraseña' isSubmitting={isSubmitting} />
          </div>
        </Form>
      </div>
      {/* Link para inicio de sesión */}
      <p className='text-center'>
        ¿Ya tienes cuenta? <Link to='/login'>Inicia sesión aquí.</Link>
      </p>
    </>
  );
}
