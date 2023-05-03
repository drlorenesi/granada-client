import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import SelectField from '../../components/formInputs/SelectField';
import CheckboxFieldGroup from '../../components/formInputs/CheckboxFieldGroup';
import Submit from '../../components/formInputs/Submit';
// Queries
import { useGetSugeridoMA } from '../../queries/useProduccion';
// Data Table
import DataTable from '../../components/DataTable';
// Utils
import { formatDec } from '../../utils/formatUtils';

export default function PorCanal() {
  const tipoOptions = [
    { key: 'Materia Prima', value: '1' },
    { key: 'Producto Intermedio', value: '4' },
    { key: 'Material de Empaque', value: '2' },
    { key: 'Útiles de Limpieza', value: '3' },
  ];

  const dropDownOptions = [
    { key: '1 Semana', value: '0.25' },
    { key: '2 Semanas', value: '0.50' },
    { key: '3 Semanas', value: '0.75' },
    { key: '4 Semanas', value: '1' },
  ];

  const checkboxOptions = [
    { key: 'MP Central', value: '1' },
    { key: 'ME Central', value: '2' },
    { key: 'UL Central', value: '6' },
    { key: 'MP Mixco Norte', value: '7' },
    { key: 'ME Mixco Norte', value: '8' },
    { key: 'UL Mixco Norte', value: '12' },
  ];

  const defaultValues = {
    tipo: '1',
    stock: '0.50',
    entrega: '0.25',
    bodegas: ['1', '2', '6', '7', '8', '12'],
  };

  const validationSchema = yup.object({
    tipo: yup
      .number()
      .typeError('Por favor seleccionar una opción.')
      .required('Campo obligatorio')
      .nullable(),
    stock: yup
      .number()
      .typeError('Por favor seleccionar una opción.')
      .required('Campo obligatorio')
      .nullable(),
    entrega: yup
      .number()
      .typeError('Por favor seleccionar una opción.')
      .required('Campo obligatorio')
      .nullable(),
    bodegas: yup.array().of(yup.number()),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const {
    isLoading,
    isFetching,
    refetch,
    data,
    // dataUpdatedAt,
    // isError,
    // error,
  } = useGetSugeridoMA(
    false,
    getValues('tipo'),
    getValues('stock'),
    getValues('entrega'),
    encodeURIComponent(getValues('bodegas'))
  );

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      { Header: 'Código', accessor: 'codigo' },
      // { Header: 'Código Alt', accessor: 'codigo_alt' },
      { Header: 'Descripción', accessor: 'descripcion' },
      { Header: 'Unidad', accessor: 'unidad' },
      {
        Header: 'Costo PP',
        accessor: 'costo_pp',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.costo_pp)}
            </div>
          );
        },
      },
      {
        Header: 'Salidas P4',
        accessor: 'salidas_p4',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.salidas_p4)}
            </div>
          );
        },
      },
      {
        Header: 'Salidas P2',
        accessor: 'salidas_p2',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.salidas_p2)}
            </div>
          );
        },
      },
      {
        Header: 'Disponible',
        accessor: 'disponible',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
              {formatDec(props.row.original.disponible)}
            </div>
          );
        },
      },
      {
        Header: 'Stock',
        accessor: 't_stock',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.t_stock)}
            </div>
          );
        },
      },
      {
        Header: 'Entrega',
        accessor: 't_entrega',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.t_entrega)}
            </div>
          );
        },
      },
      {
        Header: 'Sugerido 4',
        accessor: 'sugerido_4',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.sugerido_4)}
            </div>
          );
        },
      },
      {
        Header: 'Sugerido 2',
        accessor: 'sugerido_2',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.sugerido_2)}
            </div>
          );
        },
      },
      {
        Header: 'Orden',
        accessor: 'orden',
        Cell: (props) => {
          let display = 'black';
          if (props.row.original.orden < 0) {
            display = 'red';
          } else {
            display = 'green';
          }
          return (
            <div
              style={{ textAlign: 'right', fontWeight: 'bold', color: display }}
            >
              {formatDec(props.row.original.orden)}
            </div>
          );
        },
      },
    ],
    []
  );

  const onSubmit = async (data) => {
    refetch();
  };

  // Sum up to 12
  const labelSize = 4;
  const inputSize = 8;

  return (
    <>
      <h2>Orden Sugerida de Materiales</h2>
      {/* Row 1 */}
      <Row>
        {/* Row 1 - Col 1 */}
        <Col lg={4} md={4} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Tipo */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Tipo:
              </Form.Label>
              <Col sm={inputSize}>
                <SelectField
                  control={control}
                  name='tipo'
                  options={tipoOptions}
                />
              </Col>
            </Form.Group>
            {/* Stock */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Stock:
              </Form.Label>
              <Col sm={inputSize}>
                <SelectField
                  control={control}
                  name='stock'
                  options={dropDownOptions}
                />
              </Col>
            </Form.Group>
            {/* Entrega */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Entrega:
              </Form.Label>
              <Col sm={inputSize}>
                <SelectField
                  control={control}
                  name='entrega'
                  options={dropDownOptions}
                />
              </Col>
            </Form.Group>
            {/* Submit */}
            <Form.Group as={Row}>
              <Col sm={{ span: inputSize, offset: labelSize }}>
                <Submit
                  name='Enviar'
                  isSubmitting={isSubmitting || isLoading || isFetching}
                  error={Object.keys(errors).length > 0}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
        {/* Row 1 - Col 2 */}
        <Col lg={4} md={4} sm={6}>
          {/* Bodegas */}
          <Form.Group as={Row} className='mb-2'>
            <Form.Label column sm={labelSize}>
              Bodegas:
            </Form.Label>
            <Col sm={inputSize}>
              <CheckboxFieldGroup
                control={control}
                name='bodegas'
                options={checkboxOptions}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {/* Row 2 */}
      <br />
      <Row>
        <Col>
          {data && (
            <DataTable columns={columns} data={data.data.rows} footer={true} />
          )}
        </Col>
      </Row>
    </>
  );
}
