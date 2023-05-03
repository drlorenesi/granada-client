import { Link, useParams } from 'react-router-dom';
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
import CheckboxFieldVal from '../../components/formInputs/CheckboxFieldVal';
import InputField from '../../components/formInputs/InputField';
import Submit from '../../components/formInputs/Submit';
// Components
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Queries
import { useGetProducto, usePutProducto } from '../../queries/useProductos';

export default function ProductoDetalle() {
  let { id } = useParams();

  const { isLoading, isError, error, data } = useGetProducto(id);

  const defaultValues = useMemo(
    () => ({
      estatus: data?.data?.rows[0].estatus || '',
      codigo: data?.data?.rows[0].codigo || '',
      codigo_alt: data?.data?.rows[0].codigo_alt || '',
      descripcion: data?.data?.rows[0].descripcion || '',
    }),
    [data]
  );

  const validationSchema = yup.object({
    codigo_alt: yup
      .string()
      .max(7, 'El código alt. no puede ser mayor de 7 caracteres.'),
    descripcion: yup
      .string()
      .min(5, 'La descripción no puede ser menor de 5 caracteres.')
      .max(70, 'La descripción no puede ser mayor a 70 caracteres.')
      .nullable(),
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
    reset(defaultValues);
  }, [reset, defaultValues]);

  const { mutateAsync: actualizar } = usePutProducto(id);

  const onSubmit = async (data) => {
    await actualizar({ id, data });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h2>Detalles de Producto</h2>
      <Row>
        <Col lg={4} md={6} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Estatus*/}
            <Form.Group className='mb-2'>
              <Form.Label>Estatus:</Form.Label>
              <CheckboxFieldVal
                control={control}
                label='Activo'
                name='estatus'
                values={{ checked: 'Activo', unChecked: 'Inactivo' }}
              />
            </Form.Group>
            {/* Código */}
            <Form.Group className='mb-2'>
              <Form.Label>Código:</Form.Label>
              <InputField
                control={control}
                name='codigo'
                type='text'
                disabled
              />
            </Form.Group>
            {/* Código Alt */}
            <Form.Group className='mb-2'>
              <Form.Label>Código Alt.:</Form.Label>
              <InputField control={control} name='codigo_alt' type='text' />
            </Form.Group>
            {/* Descripción */}
            <Form.Group className='mb-2'>
              <Form.Label>Descripción:</Form.Label>
              <InputField control={control} name='descripcion' type='text' />
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
      <Link to='/maestros/productos'>
        <Button variant='outline-primary'>&laquo; Regresar</Button>
      </Link>
    </>
  );
}
