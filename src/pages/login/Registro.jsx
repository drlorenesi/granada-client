import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import Submit from '../../components/formInputs/Submit';
// Auth Hook
import { useAuth } from '../../context/AuthContext';

export default function Registro() {
  const [registerError, setRegisterError] = useState(false);
  const [show, setShow] = useState(false);
  const { useRegistro } = useAuth();

  const defaultValues = {
    nombre: '',
    apellido: '',
    email: '',
    pass: '',
    confirmPass: '',
  };

  const validationSchema = yup.object({
    nombre: yup
      .string()
      .min(2, 'Su nombre debe contener almenos 2 caracteres.')
      .required('Campo obligatorio.'),
    apellido: yup
      .string()
      .min(2, 'Su apellido debe contener almenos 2 caracteres.')
      .required('Campo obligatorio.'),
    email: yup
      .string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com)$/,
        'Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com'
      )
      .required('Campo obligatorio.'),
    pass: yup
      .string()
      .min(4, 'Contraseña no puede ser menor a 4 caracteres.')
      .required('Campo obligatorio.'),
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

  const { mutateAsync: registro } = useRegistro('/gracias');

  const onSubmit = async (data) => {
    try {
      await registro(data);
    } catch (err) {
      setRegisterError(err.response.data?.mensaje);
      setShow(true);
    }
  };

  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>Regístrate</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='nombre'
              type='text'
              placeholder='Nombre'
            />
          </Form.Group>
          {/* Apellido */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='apellido'
              type='text'
              placeholder='Apellido'
            />
          </Form.Group>
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
          {/* Pass */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='pass'
              type='password'
              placeholder='Contraseña'
            />
          </Form.Group>
          {/* Confirm Pass */}
          <Form.Group className='mb-2'>
            <InputField
              control={control}
              name='confirmPass'
              type='password'
              placeholder='Confirma tu contraseña'
            />
          </Form.Group>
          {/* Error de registro */}
          {registerError && show && (
            <Alert
              className='text-center'
              variant='danger'
              onClose={() => setShow(false)}
              dismissible
            >
              {registerError}
            </Alert>
          )}
          <div className='d-grid'>
            <Submit name='Crear cuenta' isSubmitting={isSubmitting} />
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
