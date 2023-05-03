import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { startOfMonth } from "date-fns";
// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Form Inputs
import DateField from "../../components/formInputs/DateField";
import Submit from "../../components/formInputs/Submit";
// Queries
import { useGetVentasPorCanal } from "../../queries/useVentas";
// Charts
import PieChart from "../../components/charts/PieChart";
// Data Table
import DataTable from "../../components/DataTable";
// Utils
import {
  formatDateISOLocal,
  formatDateLong,
  formatDec,
  formatQ,
} from "../../utils/formatUtils";

export default function PorCanal() {
  const defaultValues = {
    fechaIni: startOfMonth(new Date()) || "",
    fechaFin: new Date() || "",
  };

  const validationSchema = yup.object({
    fechaIni: yup.date().required("Campo obligatorio").nullable(),
    fechaFin: yup.date().required("Campo obligatorio").nullable(),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
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
  } = useGetVentasPorCanal(
    false,
    formatDateISOLocal(getValues("fechaIni") || null),
    formatDateISOLocal(getValues("fechaFin") || null)
  );

  // Donut Chart
  // -----------
  const donutSeries = data?.data.rows.map((row) => row.total_ventas_siva);
  const donutLabels = data?.data.rows.map((row) => row.canal);

  // Data Table
  // ----------
  const columns = useMemo(
    () => [
      { Header: "Canal", accessor: "canal" },
      {
        Header: "Total Ventas sIVA",
        accessor: "total_ventas_siva",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.total_ventas_siva)}
            </div>
          );
        },
      },
      {
        Header: "Total NC Valor sIVA",
        accessor: "total_nc_valor_siva",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.total_nc_valor_siva)}
            </div>
          );
        },
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: (props) => {
          return (
            <div style={{ textAlign: "right" }}>
              {formatDec(props.row.original.total)}
            </div>
          );
        },
        Footer: (props) => {
          let total = props.rows.reduce((a, b) => a + b.values.total, 0);
          return (
            <div style={{ textAlign: "right" }}>
              <b>{formatQ(total)}</b>
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
      <h2>Ventas por Canal</h2>
      {/* Row 1 */}
      <Row>
        {/* Row 1 - Col 1 */}
        <Col lg={4} md={4} sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Fecha Inicio */}
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={labelSize}>
                Inicio:
              </Form.Label>
              <Col sm={inputSize}>
                <DateField control={control} name="fechaIni" />
              </Col>
            </Form.Group>
            {/* Fecha Fin */}
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={labelSize}>
                Fin:
              </Form.Label>
              <Col sm={inputSize}>
                <DateField control={control} name="fechaFin" />
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
          {!!dataUpdatedAt && (
            <div className="text-center">
              <small>
                <div>Mostrando resultados del:</div>
                <div>
                  <b>{data?.data.query.fechaIni}</b> al{" "}
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
          <div className="d-flex justify-content-center">
            {data && (
              <PieChart series={donutSeries} labels={donutLabels} width="460" />
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
