import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import Submit from '../../components/formInputs/Submit';
// Auth Hook
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [signInError, setSignInError] = useState(false);
  const [show, setShow] = useState(false);
  const { auth, useLogin } = useAuth();

  const defaultValues = {
    email: '',
    pass: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com)$/,
        'Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com'
      )
      .required('Campo obligatorio.'),
    pass: yup.string().required('Campo obligatorio.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync: login } = useLogin();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (err) {
      setSignInError(err.response.data?.mensaje);
      setShow(true);
    }
  };

  // If the user is logged in, redirect to home
  if (auth) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>Iniciar Sesión</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='email'
              type='email'
              placeholder='Email'
              message='Tu correo @granada.com.gt o @chocolatesgranada.com'
            />
          </Form.Group>
          {/* pass */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='pass'
              type='password'
              placeholder='Contraseña'
            />
          </Form.Group>
          {/* Error de inicio de sesión */}
          {signInError && show && (
            <Alert
              className='text-center'
              variant='danger'
              onClose={() => setShow(false)}
              dismissible
            >
              {signInError}
            </Alert>
          )}
          <div className='d-grid'>
            <Submit
              name='Iniciar sesión'
              isSubmitting={isSubmitting}
              error={Object.keys(errors).length > 0}
            />
          </div>
        </Form>
        {/* Link para registro */}
        <br />
        <p className='text-center'>
          ¿No tienes cuenta? <Link to='/registro'>Registrate aquí.</Link>
        </p>
      </div>
      <p className='text-center'>
        <Link to='/solicitar'>¿Olvidaste tu contraseña?</Link>
      </p>
    </>
  );
}
