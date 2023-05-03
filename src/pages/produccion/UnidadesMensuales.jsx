import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { startOfYear } from 'date-fns';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import DateField from '../../components/formInputs/DateField';
import Submit from '../../components/formInputs/Submit';
// Queries
import { useGetProduccionPorUnidades } from '../../queries/useProduccion';
// Data Table
import DataTable from '../../components/DataTable';
// Utils
import { formatDateISOLocal, formatDec } from '../../utils/formatUtils';

export default function PorUnidadesMensuales() {
  const defaultValues = {
    fechaIni: startOfYear(new Date()) || '',
    fechaFin: new Date() || '',
  };

  const validationSchema = yup.object({
    fechaIni: yup.date().required('Campo obligatorio').nullable(),
    fechaFin: yup.date().required('Campo obligatorio').nullable(),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const {
    isLoading,
    isFetching,
    refetch,
    data,
    // isError,
    // error,
  } = useGetProduccionPorUnidades(
    false,
    formatDateISOLocal(getValues('fechaIni') || null),
    formatDateISOLocal(getValues('fechaFin') || null)
  );

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      { Header: 'Código', accessor: 'codigo' },
      { Header: 'Código Alt', accessor: 'codigo_alt' },
      { Header: 'Descripción', accessor: 'descripcion' },
      {
        Header: 'Peso',
        accessor: 'peso',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.peso, 3)}
            </div>
          );
        },
      },
      {
        Header: 'Enero',
        accessor: 'Enero',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Enero)}
            </div>
          );
        },
      },
      {
        Header: 'Febrero',
        accessor: 'Febrero',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Febrero)}
            </div>
          );
        },
      },
      {
        Header: 'Marzo',
        accessor: 'Marzo',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Marzo)}
            </div>
          );
        },
      },
      {
        Header: 'Abril',
        accessor: 'Abril',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Abril)}
            </div>
          );
        },
      },
      {
        Header: 'Mayo',
        accessor: 'Mayo',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Mayo)}
            </div>
          );
        },
      },
      {
        Header: 'Junio',
        accessor: 'Junio',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Junio)}
            </div>
          );
        },
      },
      {
        Header: 'Julio',
        accessor: 'Julio',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Julio)}
            </div>
          );
        },
      },
      {
        Header: 'Agosto',
        accessor: 'Agosto',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Agosto)}
            </div>
          );
        },
      },
      {
        Header: 'Septiembre',
        accessor: 'Septiembre',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Septiembre)}
            </div>
          );
        },
      },
      {
        Header: 'Octubre',
        accessor: 'Octubre',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Octubre)}
            </div>
          );
        },
      },
      {
        Header: 'Noviembre',
        accessor: 'Noviembre',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Noviembre)}
            </div>
          );
        },
      },
      {
        Header: 'Diciembre',
        accessor: 'Diciembre',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.Diciembre)}
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
      <h2>Unidades Producidas Mensuales</h2>
      {/* Row 1 */}
      <Row>
        {/* Row 1 - Col 1 */}
        <Col lg={4} md={4} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Fecha Inicio */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Inicio:
              </Form.Label>
              <Col sm={inputSize}>
                <DateField control={control} name='fechaIni' />
              </Col>
            </Form.Group>
            {/* Fecha Fin */}
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column sm={labelSize}>
                Fin:
              </Form.Label>
              <Col sm={inputSize}>
                <DateField control={control} name='fechaFin' />
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
        <Col></Col>
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
