import { Outlet } from 'react-router-dom';
// Components
import Navigation from './Navigation';
import Footer from './Footer';
// Bootstrap
import Container from 'react-bootstrap/Container';

export default function Layout() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navigation />
      <Container className='flex-shrink-0 mb-3' fluid>
        <Outlet />
      </Container>
      <footer className='mt-auto py-3 bg-light'>
        <Footer />
      </footer>
    </div>
  );
}
