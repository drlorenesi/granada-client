import { NavLink } from 'react-router-dom';
// Bootstrap
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Auth Hook
import { useAuth } from '../context/AuthContext';
// Utils
import decodeSession from '../utils/decodeSession';

export default function ProtectedNav({
  type = null,
  name,
  to,
  menuOpen,
  toggleMenu,
  roles = null,
}) {
  let { auth } = useAuth();
  let decoded = decodeSession(auth);
  let disabled = !roles?.includes(decoded.role);

  if (type === 'dropdown') {
    return (
      <NavDropdown.Item
        as={NavLink}
        to={to}
        onClick={menuOpen ? toggleMenu : null}
        disabled={disabled}
      >
        {name}
      </NavDropdown.Item>
    );
  } else {
    return (
      <Nav.Link
        as={NavLink}
        to={to}
        onClick={menuOpen ? toggleMenu : null}
        disabled={disabled}
      >
        {name}
      </Nav.Link>
    );
  }
}
