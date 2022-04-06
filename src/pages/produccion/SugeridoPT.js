import { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import DataTable from '../../components/DataTable';
import { formatDec } from '../../utils/formatUtils';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import SelectField from '../../components/formInputs/SelectField';
// API
import api from '../../api/auth-api';

export default function OrdenSugeridaPT() {
  const [data, setData] = useState(null);

  const dropDownOptions = [
    { key: '1 Semana', value: '0.25' },
    { key: '2 Semanas', value: '0.50' },
    { key: '3 Semanas', value: '0.75' },
    { key: '4 Semanas', value: '1' },
  ];

  const initialValues = {
    produccion: '0.25',
    stock: '0.50',
  };

  const validationSchema = Yup.object({
    produccion: Yup.number().required('Campo obligatorio').nullable(),
    stock: Yup.number().required('Campo obligatorio').nullable(),
  });

  const onSubmit = async ({ produccion, stock }, { setSubmitting }) => {
    const res = await api.get(
      `/reportes/produccion/sugerido?produccion=${produccion}&stock=${stock}`
    );
    console.log(res.data);
    setData(res.data);
    setSubmitting(false);
  };

  // Data Table
  const columns = [
    { Header: 'Código', accessor: 'codigo' },
    { Header: 'Código Alt', accessor: 'codigo_alt' },
    { Header: 'Descripción', accessor: 'descripcion' },
    {
      Header: 'Ventas P4',
      accessor: 'ventas_p4',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.ventas_p4)}
          </div>
        );
      },
    },
    {
      Header: 'Ventas P2',
      accessor: 'ventas_p2',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.ventas_p2)}
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
      Header: 'Produccion',
      accessor: 't_produccion',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.t_produccion)}
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
      Header: 'Promedio',
      accessor: 'promedio',
      Cell: (props) => {
        let display = 'black';
        if (props.row.original.promedio < 0) {
          display = 'red';
        } else {
          display = 'green';
        }
        return (
          <div
            style={{ textAlign: 'right', fontWeight: 'bold', color: display }}
          >
            {formatDec(props.row.original.promedio)}
          </div>
        );
      },
    },
  ];

  // Sum up to 12
  const labelSize = 4;
  const inputSize = 8;

  return (
    <>
      <h1>Orden Sugerida de Producto Terminado</h1>
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
                {/* Producción */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Producción:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <SelectField name='produccion' options={dropDownOptions} />
                  </Col>
                </Form.Group>
                {/* Stock */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Stock:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <SelectField name='stock' options={dropDownOptions} />
                  </Col>
                </Form.Group>
                {/* Submit */}
                <Form.Group as={Row} className='mb-2'>
                  <Col sm={{ span: inputSize, offset: labelSize }}>
                    <Button
                      variant='primary'
                      type='submit'
                      block='true'
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      Enviar
                    </Button>
                  </Col>
                </Form.Group>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {data && (
            <DataTable columns={columns} data={data.rows} footer={true} />
          )}
        </Col>
      </Row>
    </>
  );
}
