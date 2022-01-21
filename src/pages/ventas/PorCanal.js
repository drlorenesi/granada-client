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
import { useGetVentasPorCanal } from '../../hooks/useVentas';
// Charts
import PieChart from '../../components/charts/PieChart';

export default function PorCanal() {
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
  } = useGetVentasPorCanal(
    false,
    formatDateISOLocal(fechaIni),
    formatDateISOLocal(fechaFin)
  );

  // Donut Chart
  // -----------
  const donutSeries = data?.data.rows.map((row) => row.total_ventas_siva);
  const donutLabels = data?.data.rows.map((row) => row.canal);

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
    { Header: 'Canal', accessor: 'canal' },
    {
      Header: 'Total Ventas sIVA',
      accessor: 'total_ventas_siva',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.total_ventas_siva)}
          </div>
        );
      },
    },
    {
      Header: 'Total NC Devolución sIVA',
      accessor: 'total_nc_devolucion_siva',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.total_nc_devolucion_siva)}
          </div>
        );
      },
    },
    {
      Header: 'Total NC Valor sIVA',
      accessor: 'total_nc_valor_siva',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.total_nc_valor_siva)}
          </div>
        );
      },
    },
    {
      Header: 'Total',
      accessor: 'total',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.total)}
          </div>
        );
      },
      Footer: (props) => {
        let total = props.rows.reduce((a, b) => a + b.values.total, 0);
        return (
          <div style={{ textAlign: 'right' }}>
            <b>{formatQ(total)}</b>
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
      <h1>Ventas por Canal</h1>
      <Row>
        <Col lg={4} md={6} sm={6}>
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
        <Col lg={8} md={6}>
          <div className='d-flex justify-content-center'>
            {data && (
              <PieChart series={donutSeries} labels={donutLabels} width='460' />
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
