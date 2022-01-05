import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import InputField from '../components/formInputs/InputField';
import SelectField from '../components/formInputs/SelectField';

import { useGetPerfil, usePutPerfil } from '../hooks/usePerfil';
import { useGetRoles } from '../hooks/useRoles';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Perfil() {
  const { data: roles } = useGetRoles();
  const options = roles?.data.map((role) => {
    return { key: role.descripcion, value: role.nivel };
  });

  const {
    isLoading,
    // isFetching,
    data,
    isError,
    error,
    // refetch,
    // dataUpdatedAt,
  } = useGetPerfil();
  const { mutateAsync: updatePerfil } = usePutPerfil();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const initialValues = {
    nombre: data?.data.nombre || '',
    apellido: data?.data.apellido || '',
    extension: data?.data.extension || '',
    email: data?.data.email || '',
    role: data?.data.role.nivel || '',
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .min(2, 'Tu nombre no puede ser menor de 2 caracteres.')
      .max(255, 'Tu nombre no puede ser mayor de 255 caracteres.')
      .required('Campo requerido.'),
    apellido: Yup.string()
      .min(2, 'Tu apellido no puede ser menor de 2 caracteres.')
      .max(255, 'Tu apellido no puede ser mayor de 255 caracteres.')
      .required('Campo requerido.'),
    extension: Yup.string()
      .min(2, 'Tu extension no puede ser menor de 2 caracteres.')
      .max(255, 'Tu extension no puede ser mayor de 255 caracteres.')
      .nullable(),
    email: Yup.string().email('Correo electrónico inválido.'),
    role: Yup.number().integer().min(0).max(10),
  });

  const onSubmit = async (values) => {
    await updatePerfil(values);
  };

  return (
    <>
      <h1>Mi Perfil</h1>
      <Row>
        <Col lg={4} md={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnBlur={false}
            // validateOnMount={true}
          >
            {(formik) => (
              <FormikForm noValidate>
                {/* Nombre */}
                <Form.Group className='mb-3'>
                  <Form.Label>Nombre</Form.Label>
                  <InputField type='text' name='nombre' />
                </Form.Group>
                {/* Apellido */}
                <Form.Group className='mb-3'>
                  <Form.Label>Apellido</Form.Label>
                  <InputField type='text' name='apellido' />
                </Form.Group>
                {/* Extension */}
                <Form.Group className='mb-3'>
                  <Form.Label>Extension</Form.Label>
                  <InputField type='text' name='extension' />
                </Form.Group>
                {/* Email */}
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <InputField type='text' name='email' readOnly />
                </Form.Group>
                {/* Role */}
                <Form.Group className='mb-2'>
                  <Form.Label>Role</Form.Label>
                  <SelectField name='role' options={options} disabled />
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
