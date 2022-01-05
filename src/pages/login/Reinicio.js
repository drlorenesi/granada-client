import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
// Context
import { useSession } from '../../context/SessionContext';

export default function Reinicio() {
  let navigate = useNavigate();
  const { session, setSession } = useSession();
  const [searchParams] = useSearchParams();
  const x = searchParams.get('x');
  const y = searchParams.get('y');

  const [updateError, setUpdateError] = useState(false);
  const [show, setShow] = useState(false);

  // Cerrar sesión de usuario en caso la tenga abierta
  useEffect(() => {
    if (session) logOut();
    async function logOut() {
      await login.get('/logout');
      setSession(null);
    }
  }, [session, setSession]);

  const initialValues = {
    pass: '',
    confirmPass: '',
  };

  const validationSchema = Yup.object({
    pass: Yup.string()
      .min(4, 'Contraseña no puede ser menor a 4 caracteres.')
      .required('Campo requerido.'),
    confirmPass: Yup.string()
      .required('Por favor confirma tu contraseña.')
      .oneOf([Yup.ref('pass'), null], 'Las contraseñas no concuerdan.'),
  });

  const onSubmit = async (values) => {
    try {
      await login.post(`/reinicio?x=${encodeURIComponent(x)}&y=${y}`, values);
      navigate('/exito');
    } catch (err) {
      setUpdateError(err.response.data?.mensaje);
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
          validateOnBlur={false}
          validateOnMount={true}
        >
          {(formik) => (
            <FormikForm noValidate>
              <h2 className='text-center p-2'>Ingresa tu nueva contraseña</h2>
              {/* Contraseña */}
              <Form.Group className='mb-2'>
                <InputField
                  type='password'
                  name='pass'
                  placeholder='Contraseña'
                />
              </Form.Group>
              {/* Confirmar Contraseña */}
              <Form.Group className='mb-2'>
                <InputField
                  type='password'
                  name='confirmPass'
                  placeholder='Confirma tu contraseña'
                />
              </Form.Group>
              {/* Error de registro */}
              {updateError && show ? (
                <Alert
                  className='text-center'
                  variant='danger'
                  onClose={() => setShow(false)}
                  dismissible
                >
                  {updateError}
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
                    ? 'Cambiando contraseña...'
                    : 'Cambiar contraseña'}
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
      {/* Link para registro */}
      <p className='text-center'>
        ¿Ya tienes cuenta? <Link to='/login'>Inicia sesión aquí.</Link>
      </p>
    </>
  );
}
