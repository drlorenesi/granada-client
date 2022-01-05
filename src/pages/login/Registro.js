import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export default function Registro() {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(false);
  const [show, setShow] = useState(false);

  const initialValues = {
    nombre: '',
    apellido: '',
    email: '',
    pass: '',
    confirmPass: '',
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .min(2, 'Su nombre debe contener almenos 2 caracteres.')
      .required('Campo requerido.'),
    apellido: Yup.string()
      .min(2, 'Su apellido debe contener almenos 2 caracteres.')
      .required('Campo requerido.'),
    email: Yup.string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com)$/,
        'Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com'
      )
      .required('Campo requerido.'),
    pass: Yup.string()
      .min(3, 'Contraseña no puede ser menor a 3 caracteres.')
      .required('Campo requerido.'),
    confirmPass: Yup.string()
      .required('Por favor confirma tu contraseña.')
      .oneOf([Yup.ref('pass'), null], 'Las contraseñas no concuerdan.'),
  });

  const onSubmit = async (values) => {
    try {
      await login.post('/registro', values);
      navigate('/gracias');
    } catch (err) {
      setRegisterError(err.response.data?.mensaje);
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
          // validateOnMount={true}
        >
          {(formik) => (
            <FormikForm noValidate>
              <h2 className='text-center p-2'>Regístrate</h2>
              {/* Nombre */}
              <Form.Group className='mb-2'>
                <InputField type='text' name='nombre' placeholder='Nombre' />
              </Form.Group>
              {/* Apellido */}
              <Form.Group className='mb-2'>
                <InputField
                  type='text'
                  name='apellido'
                  placeholder='Apellido'
                />
              </Form.Group>
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
              {/* Confirmar Contraseña */}
              <Form.Group className='mb-2'>
                <InputField
                  type='password'
                  name='confirmPass'
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
              {/* Submit */}
              <div className='d-grid'>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
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
