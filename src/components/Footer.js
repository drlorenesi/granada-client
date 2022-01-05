import Container from 'react-bootstrap/Container';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <span className='text-muted'>
        <small>&copy; {new Date().getFullYear()} Fábrica Granada</small>
      </span>
      <br />
      <a
        style={{ color: '#777' }}
        href='https://github.com/drlorenesi'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaGithub />
      </a>
    </Container>
  );
}
