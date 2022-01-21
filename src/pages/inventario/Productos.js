import { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// import Loader from '../../components/Loader';
// import ErrorMessage from '../../components/ErrorMessage';
import DataTable from '../../components/DataTable';
import { formatDateLong, formatDec } from '../../utils/formatUtils';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import SelectField from '../../components/formInputs/SelectField';
// Hooks
import {
  useGetTiposInventario,
  useGetProductos,
} from '../../hooks/useInventario';

export default function Productos() {
  const [values, setValues] = useState({ tipo: '0', estatus: 'activo' });

  const { data: tipos } = useGetTiposInventario();
  const tipoOptions = tipos?.data.rows.map((tipo) => {
    return { key: tipo.descripcion, value: tipo.codigo };
  });

  const estatusOptions = [
    { key: 'Activo', value: 'activo' },
    { key: 'Inactivo', value: 'inactivo' },
  ];

  const {
    // isLoading,
    isFetching,
    refetch,
    data,
    dataUpdatedAt,
    // isError,
    // error,
  } = useGetProductos(false, values?.tipo, values?.estatus);

  console.log(data);

  const initialValues = {
    tipo: values.tipo || '',
    estatus: values.estatus || '',
  };

  const validationSchema = Yup.object({
    tipo: Yup.string().required('Campo obligatorio'),
    estatus: Yup.string().required('Campo obligatorio'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setValues(values);
    refetch();
    setSubmitting(false);
  };

  // { Header: '', accessor: '' },

  // Data Table
  const columns = [
    { Header: 'Codigo', accessor: 'codigo' },
    { Header: 'Tipo', accessor: 'tipo_inventario' },
    {
      Header: 'Intermedio',
      accessor: 'intermedio',
      Cell: ({ row }) => (row.original.intermedio === 1 ? 'Si' : 'No'),
    },
    { Header: 'Codigo Alt', accessor: 'codigo_alt' },
    { Header: 'Descripcion', accessor: 'descripcion' },
    {
      Header: 'Precio Sug.',
      accessor: 'precio_sugerido',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.precio_sugerido)}
          </div>
        );
      },
    },
    {
      Header: 'Costo',
      accessor: 'costo',
      Cell: (props) => {
        return (
          <div style={{ textAlign: 'right' }}>
            {formatDec(props.row.original.costo)}
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
      <h1>Productos</h1>
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
                    Tipo:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <SelectField name='tipo' options={tipoOptions} />
                  </Col>
                </Form.Group>
                {/* Fecha Fin */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Estatus:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <SelectField name='estatus' options={estatusOptions} />
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
                        ? 'Buscando...'
                        : 'Buscar'}
                    </Button>
                  </Col>
                </Form.Group>
              </FormikForm>
            )}
          </Formik>
        </Col>
        <Col lg={8} md={6}></Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {dataUpdatedAt !== 0 && (
            <i>
              <small>
                Última actualización: {formatDateLong(dataUpdatedAt)}
              </small>
            </i>
          )}
          {data && <DataTable columns={columns} data={data.data.rows} />}
        </Col>
      </Row>
    </>
  );
}
