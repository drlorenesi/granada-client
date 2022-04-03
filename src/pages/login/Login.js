import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
// Login API
import login from '../../api/login-api';
// Session Context
import { useSession } from '../../context/SessionContext';

export default function Login() {
  const { setSession } = useSession();

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || '/';

  const [signInError, setSignInError] = useState(false);
  const [show, setShow] = useState(false);

  const initialValues = {
    email: '',
    pass: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com)$/,
        'Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com'
      )
      .required('Campo requerido.'),
    pass: Yup.string().required('Campo requerido.'),
  });

  const onSubmit = async (values) => {
    try {
      const res = await login.post('login', values);
      const sessionInfo = res.headers['session-info'];
      setSession(sessionInfo);
      navigate(redirect, { replace: true });
    } catch (err) {
      setSignInError(err.response.data?.mensaje);
      setShow(true);
    }
  };

  return (
    <>
      <div className='login-form'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          // enableReinitialize
          // validateOnBlur={false}
          // validateOnMount={true}
        >
          {(formik) => (
            <FormikForm noValidate className='mb-4'>
              <h2 className='text-center p-2'>Iniciar Sesión</h2>
              {/* Email */}
              <Form.Group className='mb-2'>
                <InputField
                  type='email'
                  name='email'
                  placeholder='Email'
                  formText='Tu correo @granada.com.gt o @chocolatesgranada.com'
                />
              </Form.Group>
              {/* Contraseña */}
              <Form.Group className='mb-2'>
                <InputField
                  type='password'
                  name='pass'
                  placeholder='Contraseña'
                />
              </Form.Group>
              {/* Error de inicio de sesión */}
              {signInError && show ? (
                <Alert
                  className='text-center'
                  variant='danger'
                  onClose={() => setShow(false)}
                  dismissible
                >
                  {signInError}
                </Alert>
              ) : null}
              {/* Submit */}
              <div className='d-grid'>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting
                    ? 'Iniciando sesión...'
                    : 'Iniciar sesión'}
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
        {/* Link para registro */}
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
