// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Info() {
  return (
    <>
      <h1>Acerca de este Portal</h1>
      <p>
        <b>NOTA:</b> Este portal se encuentra en período de prueba.
      </p>
      <Row>
        <Col sm={6}>
          <p>
            El objetivo de este portal es proveer a los usuario de Fábrica
            Granada encontrar información relevante a su área de una manera
            segura, rápida y eficiente.
          </p>
        </Col>
        <Col sm={6}></Col>
      </Row>
    </>
  );
}
