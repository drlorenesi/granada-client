// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Info() {
  return (
    <>
      <h2>Acerca de este Portal</h2>
      <p>
        <b>NOTA:</b> Este portal se encuentra en período de prueba.
      </p>
      <Row>
        <Col sm={6}>
          <p>
            El objetivo de este portal es proveer a los usuarios información
            relevante a su área de trabajo de manera segura, rápida y eficiente.
          </p>
        </Col>
        <Col sm={6}></Col>
      </Row>
    </>
  );
}
