import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import Submit from '../../components/formInputs/Submit';
// Queries
import { usePostPass } from '../../queries/usePerfil';

export default function Pass() {
  const defaultValues = {
    passActual: '',
    passNueva: '',
    confirmPass: '',
  };

  const validationSchema = yup.object({
    passActual: yup.string().required('Campo requerido.'),
    passNueva: yup
      .string()
      .min(4, 'Contraseña no puede ser menor a 4 caracteres.')
      .required('Campo requerido.'),
    confirmPass: yup
      .string()
      .required('Por favor confirma tu contraseña.')
      .oneOf([yup.ref('passNueva'), null], 'Las contraseñas no concuerdan.'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync: updatePass } = usePostPass();

  // Clear form after a successfull submit
  useEffect(() => {
    reset({
      passActual: '',
      passNueva: '',
      confirmPass: '',
    });
  }, [reset, isSubmitSuccessful]);

  const onSubmit = async (data) => {
    await updatePass(data);
  };

  return (
    <>
      <h2>Cambio de Contraseña</h2>
      <Row>
        <Col lg={4} md={6} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Contraseña Actual */}
            <Form.Group className='mb-2'>
              <Form.Label>Contraseña actual:</Form.Label>
              <InputField control={control} name='passActual' type='password' />
            </Form.Group>
            {/* Contraseña Nueva */}
            <Form.Group className='mb-2'>
              <Form.Label>Contraseña nueva:</Form.Label>
              <InputField control={control} name='passNueva' type='password' />
            </Form.Group>
            {/* Confirmar Contraseña Nueva */}
            <Form.Group className='mb-2'>
              <Form.Label>Confirma tu contraseña nueva:</Form.Label>
              <InputField
                control={control}
                name='confirmPass'
                type='password'
              />
            </Form.Group>
            <Submit
              name='Actualizar'
              isSubmitting={isSubmitting}
              error={Object.keys(errors).length > 0}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
}
