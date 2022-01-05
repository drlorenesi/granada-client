import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
// Login API
import login from '../../api/login-api';

export default function Solicitar() {
  let navigate = useNavigate();

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^.+?(?:granada.com.gt|chocolatesgranada.com|test.com|gmail.com)$/,
        'Por favor usa tu correo de @granada.com.gt o @chocolatesgranada.com'
      )
      .required('Campo requerido.'),
  });

  const onSubmit = async (values) => {
    await login.post('/solicitar', values);
    navigate('/enviado');
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
              <h2 className='text-center p-2'>¿Olvidaste tu contraseña?</h2>
              <p className='text-center text-muted'>
                Por favor ingresa el correo electrónico que usaste para crear tu
                cuenta.
              </p>
              {/* Email */}
              <Form.Group className='mb-2'>
                <InputField
                  type='email'
                  name='email'
                  placeholder='Email'
                  formText='Tu correo @granada.com.gt o @chocolatesgranada.com'
                />
              </Form.Group>
              {/* Submit */}
              <div className='d-grid'>
                <Button
                  variant='primary'
                  type='submit'
                  // disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting
                    ? 'Solicitando...'
                    : 'Solicitar reinicio'}
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
