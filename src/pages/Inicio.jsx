import { useState } from 'react';
import Calendar from 'react-calendar';
// Components
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Queries
import { useGetPerfil } from '../queries/usePerfil';
// Utils
import { formatDate, formatDateLong } from '../utils/formatUtils';
// CSS
import 'react-calendar/dist/Calendar.css';

export default function Inicio() {
  const [value, setValue] = useState(new Date());
  const { isLoading, isError, error, data } = useGetPerfil();

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }
  return (
    <>
      <h2>¡Hola {data.data.nombre}!</h2>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <p>
            Hoy es {formatDate(new Date())}. Tu último ingreso fue el{' '}
            {formatDateLong(new Date(data.data.ultimoIngreso))}
          </p>
          <div className='d-flex justify-content-left'>
            &nbsp;&nbsp;&nbsp;
            <Calendar
              onChange={onChange}
              value={value}
              calendarType='US'
              locale='es-419'
            />
          </div>
          <br />
          <p>Te adjuntamos algunos vículos que pueden ser de tu interés:</p>
          <ul>
            <li>
              <a
                href='https://granada.com.gt/es/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Fábrica Granada
              </a>
            </li>
            <li>
              <a
                href='https://banguat.gob.gt/tipo_cambio/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Tipo de Cambio - Banco de Guatemala
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
}
