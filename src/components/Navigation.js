import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Login API
import login from '../api/login-api';
// Context
import { useSession } from '../context/SessionContext';

export default function Navigation() {
  const { setSession } = useSession();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setSession(null);
    await login.get('/logout');
    navigate('/login');
  };

  return (
    <Navbar
      bg='light'
      expand='sm'
      sticky='top'
      className='shadow-sm rounded mb-2'
    >
      <Container fluid>
        {/* "Link" in brand component since no stlying is needed */}
        <Navbar.Brand as={Link} to='/'>
          <FaHome />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <NavDropdown title='Ventas'>
              <NavDropdown.Item as={NavLink} to='/ventas/canal'>
                Por Canal
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/ventas/producto'>
                Por Producto
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/ventas/categoria'>
                Por Categoría
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Producción'>
              <NavDropdown.Item as={NavLink} to='/produccion/sugerido-pt'>
                Orden Sugerida PT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to='/info'>
              Info
            </Nav.Link>
            <NavDropdown align='end' title='Admin'>
              <NavDropdown.Item as={NavLink} to='/admin/usuarios'>
                Usuarios
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/admin/sesiones'>
                Sesiones
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown align='end' title={<FaUserCircle size={21} />}>
              <NavDropdown.Item as={NavLink} to='/perfil'>
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/pass'>
                Cambiar Contraseña
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
