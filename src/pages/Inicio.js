// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Hooks
import { useGetPerfil } from '../hooks/usePerfil';

export default function Inicio() {
  const { data } = useGetPerfil();

  return (
    <>
      <h1>Inicio</h1>
      <p>Bienvenido {data?.data.nombre}!</p>
      <Row>
        <Col sm={6}></Col>
        <Col sm={6}></Col>
      </Row>
    </>
  );
}
