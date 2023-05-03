import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import SelectField from '../../components/formInputs/SelectField';
import Submit from '../../components/formInputs/Submit';
// Components
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Queries
import { useGetRoles } from '../../queries/useRoles';
import { useGetUsuario, usePutUsuario } from '../../queries/useAdmin';

export default function Usuario() {
  let { id } = useParams();
  let navigate = useNavigate();

  // Fetch dropdown menu options first
  const { isLoading: isLoadingRoles, data: roles } = useGetRoles();
  const selectOptions = roles?.data.map((role) => {
    return { key: role.descripcion, value: role.nivel };
  });

  const onError = (error) => {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      navigate('/no-existe', { replace: true });
    }
  };

  // Fetch main values after dropdown options
  const {
    isLoading: isLoadingUsuario,
    data,
    isError,
    error,
  } = useGetUsuario(!!id, id, onError);

  const defaultValues = useMemo(
    () => ({
      nombre: data?.data.nombre || '',
      apellido: data?.data.apellido || '',
      extension: data?.data.extension || '',
      email: data?.data.email || '',
      role: data?.data.role.nivel || '',
    }),
    [data]
  );

  const validationSchema = yup.object({
    nombre: yup
      .string()
      .min(2, 'Tu nombre no puede ser menor de 2 caracteres.')
      .max(255, 'Tu nombre no puede ser mayor de 255 caracteres.')
      .required('Campo requerido.'),
    apellido: yup
      .string()
      .min(2, 'Tu apellido no puede ser menor de 2 caracteres.')
      .max(255, 'Tu apellido no puede ser mayor de 255 caracteres.')
      .required('Campo requerido.'),
    extension: yup
      .string()
      .max(255, 'Tu extension no puede ser mayor de 255 caracteres.')
      .nullable(),
    email: yup.string().email('Correo electrónico inválido.'),
    role: yup.number('test').integer().min(0).max(10),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  // effect runs when data has been fetched
  useEffect(() => {
    // reset form with user data
    reset(defaultValues);
  }, [reset, defaultValues]);

  const { mutateAsync: actualizar } = usePutUsuario();

  const onSubmit = async (data) => {
    await actualizar({ id, data });
  };

  if (isLoadingRoles || isLoadingUsuario) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h2>Actualizar Usuario</h2>
      <Row>
        <Col lg={4} md={6} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre */}
            <Form.Group className='mb-2'>
              <Form.Label>Nombre:</Form.Label>
              <InputField control={control} name='nombre' type='text' />
            </Form.Group>
            {/* Apellido */}
            <Form.Group className='mb-2'>
              <Form.Label>Apellido:</Form.Label>
              <InputField control={control} name='apellido' type='text' />
            </Form.Group>
            {/* Extension */}
            <Form.Group className='mb-2'>
              <Form.Label>Extensión:</Form.Label>
              <InputField control={control} name='extension' type='text' />
            </Form.Group>
            {/* Email */}
            <Form.Group className='mb-2'>
              <Form.Label>Email:</Form.Label>
              <InputField control={control} name='email' type='email' />
            </Form.Group>
            {/* Role */}
            <Form.Group className='mb-2'>
              <Form.Label>Role:</Form.Label>
              <SelectField
                control={control}
                name='role'
                options={selectOptions}
              />
            </Form.Group>

            <Submit
              name='Actualizar'
              isSubmitting={isSubmitting}
              error={Object.keys(errors).length > 0}
            />
          </Form>
          <hr />
        </Col>
      </Row>
      {/* <br /> */}
      <Link to='/admin/usuarios'>
        <Button variant='outline-primary'>&laquo; Regresar</Button>
      </Link>
    </>
  );
}
