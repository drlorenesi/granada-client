import { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { startOfMonth } from 'date-fns';
// import Loader from '../../components/Loader';
// import ErrorMessage from '../../components/ErrorMessage';
import DataTable from '../../components/DataTable';
import {
  formatDec,
  formatQ,
  formatP,
  formatDateISOLocal,
  formatDateLong,
} from '../../utils/formatUtils';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import DateField from '../../components/formInputs/DateField';
// Hooks
import { useGetVentasPorProducto } from '../../hooks/useVentas';
// Charts
import HBarChart from '../../components/charts/HBarChart';

export default function PorProducto() {
  const [fechaIni, setFechaIni] = useState(startOfMonth(new Date()));
  const [fechaFin, setFechaFin] = useState(new Date());

  const {
    // isLoading,
    isFetching,
    refetch,
    data,
    dataUpdatedAt,
    // isError,
    // error,
  } = useGetVentasPorProducto(
    false,
    formatDateISOLocal(fechaIni),
    formatDateISOLocal(fechaFin)
  );

  let top10 = data?.data.rows
    .sort((a, p) => (a.venta_total_siva > p.venta_total_siva ? -1 : 1))
    .slice(0, 10);

  // Chart
  // -----
  const hbarTitle = 'Top 10 de Productos mas vendidos por monto (Q)';
  const hbarSeries = [
    {
      name: 'Monto',
      data: top10?.map((p) => p.venta_total_siva),
    },
  ];
  const hbarLabels = top10?.map((p) => p.descripcion);

  const initialValues = {
    fechaIni: fechaIni || '',
    fechaFin: fechaFin || '',
  };

  const validationSchema = Yup.object({
    fechaIni: Yup.string().required('Campo obligatorio').nullable(),
    fechaFin: Yup.string().required('Campo obligatorio').nullable(),
  });

  const onSubmit = ({ fechaIni, fechaFin }, { setSubmitting }) => {
    setFechaIni(fechaIni);
    setFechaFin(fechaFin);
    refetch();
    setSubmitting(false);
  };

  // Data Table
  const columns = [
    { Header: 'Cod. Alt.', accessor: 'codigo_alt' },
    { Header: 'Producto', accessor: 'producto' },
    { Header: 'Descripcion', accessor: 'descripcion' },
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
  ];

  // Sum up to 12
  const labelSize = 3;
  const inputSize = 9;

  return (
    <>
      <h1>Ventas por Producto</h1>
      <Row>
        <Col lg={4} md={5} sm={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            // validateOnBlur={false}
            // validateOnMount={true}
          >
            {(formik) => (
              <FormikForm noValidate>
                {/* Fecha Inicio */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Inicio:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <DateField name='fechaIni' />
                  </Col>
                </Form.Group>
                {/* Fecha Fin */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Fin:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <DateField name='fechaFin' />
                  </Col>
                </Form.Group>
                {/* Submit */}
                <Form.Group as={Row} className='mb-2'>
                  <Col sm={{ span: inputSize, offset: labelSize }}>
                    <Button
                      variant='primary'
                      type='submit'
                      block='true'
                      disabled={
                        formik.isSubmitting ||
                        !formik.isValid ||
                        (isFetching ? true : null)
                      }
                    >
                      {formik.isSubmitting || isFetching
                        ? 'Actualizando...'
                        : 'Actualizar'}
                    </Button>
                  </Col>
                </Form.Group>
              </FormikForm>
            )}
          </Formik>
        </Col>
        <Col lg={8} md={7}>
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
      <hr />
      <Row>
        <Col>
          {dataUpdatedAt !== 0 && (
            <i>
              <small>
                Mostrando resultados del <b>{data?.data.query.fechaIni}</b> al{' '}
                <b>{data?.data.query.fechaFin}</b>
                <br />
                Última actualización: {formatDateLong(dataUpdatedAt)}
              </small>
            </i>
          )}
          {data && (
            <DataTable columns={columns} data={data.data.rows} footer={true} />
          )}
        </Col>
      </Row>
    </>
  );
}
