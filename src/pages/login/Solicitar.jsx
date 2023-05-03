import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
// Bootstrap
import Form from 'react-bootstrap/Form';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import Submit from '../../components/formInputs/Submit';
// Auth Hook
import { useAuth } from '../../context/AuthContext';

export default function Solicitar() {
  const { useSolicitar } = useAuth();

  const defaultValues = {
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com)$/,
        'Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com'
      )
      .required('Campo obligatorio.'),
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

  const { mutateAsync: solicitar } = useSolicitar('/enviado');

  const onSubmit = async (data) => {
    // No need to catch errors since user should not be notified if email exists
    await solicitar(data);
  };

  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>¿Olvidaste tu contraseña?</h2>
        <p className='text-center text-muted'>
          Por favor ingresa el correo electrónico que usaste para crear tu
          cuenta.
        </p>
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
          <div className='d-grid'>
            <Submit name='Solicitar reinicio' isSubmitting={isSubmitting} />
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
