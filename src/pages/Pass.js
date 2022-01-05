import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import InputField from '../components/formInputs/InputField';
// Auth API
import auth from '../api/auth-api';

export default function Pass() {
  const initialValues = {
    passActual: '',
    passNueva: '',
    confirmPass: '',
  };

  const validationSchema = Yup.object({
    passActual: Yup.string()
      .min(3, 'Contraseña no puede ser menor a 3 caracteres.')
      .required('Campo requerido.'),
    passNueva: Yup.string()
      .min(3, 'Contraseña no puede ser menor a 3 caracteres.')
      .required('Campo requerido.'),
    confirmPass: Yup.string()
      .required('Por favor confirma tu contraseña.')
      .oneOf([Yup.ref('passNueva'), null], 'Las contraseñas no concuerdan.'),
  });

  const onSubmit = async (values) => {
    const res = await auth.post('/cambio-pass', values);
    toast.success(res.data?.mensaje);
  };

  return (
    <>
      <h1>Cambio de Contraseña</h1>
      <Row>
        <Col lg={4} md={6}>
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
                {/* Contraseña actual */}
                <Form.Group className='mb-3'>
                  <Form.Label>Contraseña actual</Form.Label>
                  <InputField type='password' name='passActual' />
                </Form.Group>
                {/* Nueva contraseña */}
                <Form.Group className='mb-3'>
                  <Form.Label>Nueva contraseña</Form.Label>
                  <InputField type='password' name='passNueva' />
                </Form.Group>
                {/* Confirmar contraseña nueva*/}
                <Form.Group className='mb-3'>
                  <Form.Label>Confirma tu nueva contraseña</Form.Label>
                  <InputField type='password' name='confirmPass' />
                </Form.Group>
                {/* Submit */}
                <Button
                  variant='primary'
                  type='submit'
                  block='true'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? 'Actualizando...' : 'Actualizar'}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
}
