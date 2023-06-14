import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Form Inputs
import SelectField from "../../components/formInputs/SelectField";
import CheckboxFieldGroup from "../../components/formInputs/CheckboxFieldGroup";
import Submit from "../../components/formInputs/Submit";
// Queries
import { useGetSugeridoPT } from "../../queries/useProduccion";
// Data Table
import DataTable from "../../components/DataTable";
// Utils
import { formatDec } from "../../utils/formatUtils";

export default function PorCanal() {
  const dropDownOptions = [
    { key: "1 Semana", value: "0.25" },
    { key: "2 Semanas", value: "0.50" },
    { key: "3 Semanas", value: "0.75" },
    { key: "4 Semanas", value: "1" },
  ];

  const checkboxOptions = [
    { key: "PT Central", value: "5" },
    { key: "PT Z2", value: "213" },
    { key: "PT Xela", value: "14" },
    { key: "PT Tienda", value: "27" },
  ];

  const defaultValues = {
    stock: "0.50",
    produccion: "0.25",
    bodegas: ["5", "213", "14", "27"],
  };

  const validationSchema = yup.object({
    stock: yup
      .number()
      .typeError("Por favor seleccionar una opción.")
      .required("Campo obligatorio")
      .nullable(),
    produccion: yup
      .number()
      .typeError("Por favor seleccionar una opción.")
      .required("Campo obligatorio")
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
    mode: "onSubmit",
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
  } = useGetSugeridoPT(
    false,
    getValues("stock"),
    getValues("produccion"),
    encodeURIComponent(getValues("bodegas"))
  );

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      { Header: "Código", accessor: "codigo" },
      { Header: "Código Alt", accessor: "codigo_alt" },
      { Header: "Descripción", accessor: "descripcion" },
      {
        Header: "Ventas P4",
        accessor: "ventas_p4",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.ventas_p4)}
            </div>
          );
        },
      },
      {
        Header: "Ventas P2",
        accessor: "ventas_p2",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.ventas_p2)}
            </div>
          );
        },
      },
      {
        Header: "Disponible",
        accessor: "disponible",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              {formatDec(props.row.original.disponible)}
            </div>
          );
        },
      },
      {
        Header: "Produccion",
        accessor: "t_produccion",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.t_produccion)}
            </div>
          );
        },
      },
      {
        Header: "Stock",
        accessor: "t_stock",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.t_stock)}
            </div>
          );
        },
      },
      {
        Header: "Sugerido 4",
        accessor: "sugerido_4",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.sugerido_4)}
            </div>
          );
        },
      },
      {
        Header: "Sugerido 2",
        accessor: "sugerido_2",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.sugerido_2)}
            </div>
          );
        },
      },
      {
        Header: "Promedio",
        accessor: "promedio",
        Cell: (props) => {
          let display = "black";
          if (props.row.original.promedio < 0) {
            display = "red";
          } else {
            display = "green";
          }
          return (
            <div
              style={{ textAlign: "right", fontWeight: "bold", color: display }}
            >
              {formatDec(props.row.original.promedio)}
            </div>
          );
        },
      },
    ],
    []
  );

  const onSubmit = async () => {
    refetch();
  };

  // Sum up to 12
  const labelSize = 4;
  const inputSize = 8;

  return (
    <>
      <h2>Orden Sugerida de PT</h2>
      {/* Row 1 */}
      <Row>
        {/* Row 1 - Col 1 */}
        <Col lg={4} md={4} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Stock */}
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={labelSize}>
                Stock:
              </Form.Label>
              <Col sm={inputSize}>
                <SelectField
                  control={control}
                  name="stock"
                  options={dropDownOptions}
                />
              </Col>
            </Form.Group>
            {/* Producción */}
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={labelSize}>
                Producción:
              </Form.Label>
              <Col sm={inputSize}>
                <SelectField
                  control={control}
                  name="produccion"
                  options={dropDownOptions}
                />
              </Col>
            </Form.Group>
            {/* Submit */}
            <Form.Group as={Row}>
              <Col sm={{ span: inputSize, offset: labelSize }}>
                <Submit
                  name="Enviar"
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
          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={labelSize}>
              Bodegas:
            </Form.Label>
            <Col sm={inputSize}>
              <CheckboxFieldGroup
                control={control}
                name="bodegas"
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
