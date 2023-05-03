import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { startOfMonth } from 'date-fns';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Form Inputs
import DateField from '../../components/formInputs/DateField';
import Submit from '../../components/formInputs/Submit';
// Queries
import { useGetVentasPorProducto } from '../../queries/useVentas';
// Charts
import HBarChart from '../../components/charts/HBarChart';
// Data Table
import DataTable from '../../components/DataTable';
// Utils
import {
  formatDateISOLocal,
  formatDateLong,
  formatDec,
  formatP,
  formatQ,
} from '../../utils/formatUtils';

export default function PorCanal() {
  const defaultValues = {
    fechaIni: startOfMonth(new Date()) || '',
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
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });

  const {
    isLoading,
    isFetching,
    refetch,
    data,
    dataUpdatedAt,
    // isError,
    // error,
  } = useGetVentasPorProducto(
    false,
    formatDateISOLocal(getValues('fechaIni') || null),
    formatDateISOLocal(getValues('fechaFin') || null)
  );

  // Bar Chart
  // ---------
  let top10 = data?.data.rows
    .sort((a, p) => (a.venta_total_siva > p.venta_total_siva ? -1 : 1))
    .slice(0, 10);

  const hbarTitle = 'Top 10 de Productos mas vendidos por monto (Q)';
  const hbarSeries = [
    {
      name: 'Monto',
      data: top10?.map((p) => p.venta_total_siva),
    },
  ];
  const hbarLabels = top10?.map((p) => p.descripcion);

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      { Header: 'Código', accessor: 'producto' },
      { Header: 'Cod. Alt.', accessor: 'codigo_alt' },
      { Header: 'Descripción', accessor: 'descripcion' },
      {
        Header: 'Cant.',
        accessor: 'cantidad_total',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {props.row.original.cantidad_total}
            </div>
          );
        },
      },
      {
        Header: 'Costo Total',
        accessor: 'costo_total',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.costo_total)}
            </div>
          );
        },
      },
      {
        Header: 'Venta Total',
        accessor: 'venta_total_siva',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.venta_total_siva)}
            </div>
          );
        },
        Footer: (props) => {
          let total = props.rows.reduce(
            (a, b) => a + b.values.venta_total_siva,
            0
          );
          return (
            <div style={{ textAlign: 'right' }}>
              <b>{formatQ(total)}</b>
            </div>
          );
        },
      },
      {
        Header: 'Profit',
        accessor: 'profit',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.profit)}
            </div>
          );
        },
        Footer: (props) => {
          let total = props.rows.reduce((a, b) => a + b.values.profit, 0);
          return (
            <div style={{ textAlign: 'right' }}>
              <b>{formatQ(total)}</b>
            </div>
          );
        },
      },
      {
        Header: 'Profit (%)',
        accessor: 'profit_p',
        Cell: (props) => {
          let color;
          if (props.row.original.profit_p < 0.25) {
            color = 'red';
          } else if (props.row.original.profit_p >= 0.35) {
            color = 'green';
          } else {
            color = 'black';
          }
          return (
            <div style={{ textAlign: 'right', color: `${color}` }}>
              {formatP(props.row.original.profit_p)}
            </div>
          );
        },
        Footer: (props) => {
          let venta = props.rows.reduce(
            (a, b) => a + b.values.venta_total_siva,
            0
          );
          let profit = props.rows.reduce((a, b) => a + b.values.profit, 0);
          let resultado = profit / venta;
          let color;
          if (resultado < 0.25) {
            color = 'red';
          } else if (resultado >= 0.35) {
            color = 'green';
          } else {
            color = 'black';
          }
          return (
            <div style={{ textAlign: 'right', color: `${color}` }}>
              <b>{formatP(resultado)}</b>
            </div>
          );
        },
      },
      {
        Header: 'Precio Prom. c/VIA',
        accessor: 'precio_prom_civa',
        Cell: (props) => {
          return (
            <div style={{ textAlign: 'right' }}>
              {formatDec(props.row.original.precio_prom_civa)}
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
      <h2>Ventas por Producto</h2>
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
          {!!dataUpdatedAt && (
            <div className='text-center'>
              <small>
                <div>Mostrando resultados del:</div>
                <div>
                  <b>{data?.data.query.fechaIni}</b> al{' '}
                  <b>{data?.data.query.fechaFin}</b>
                </div>
                <div>Última actualización:</div>
                <div>
                  <b>{formatDateLong(dataUpdatedAt)}</b>
                </div>
              </small>
            </div>
          )}
        </Col>
        {/* Row 1 - Col 2 */}
        <Col>
          <div className='d-flex justify-content-center'>
            {data && (
              <HBarChart
                title={hbarTitle}
                series={hbarSeries}
                labels={hbarLabels}
                width='460'
              />
            )}
          </div>
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
