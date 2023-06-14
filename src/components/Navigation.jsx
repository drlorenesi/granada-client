import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUserCog, FaEdit } from "react-icons/fa";
import { GiChocolateBar } from "react-icons/gi";
// Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// Components
import ProtectedNav from "./ProtectedNav";
// Auth Hook
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(null);
  const { useLogout } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  const { mutateAsync: logout } = useLogout("/login");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="sm"
        sticky="top"
        className="shadow-sm rounded mb-2"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <FaHome />
          </Navbar.Brand>
          <Navbar.Toggle onClick={toggleMenu} />
          <Navbar.Offcanvas
            placement="end"
            show={menuOpen ? 1 : 0}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <hr />
              {/* Left side Nav */}
              {/* -------------- */}
              <Nav className="me-auto">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Ventas */}
                  <NavDropdown title="Ventas">
                    {/* Por Canal */}
                    <ProtectedNav
                      type="dropdown"
                      name="Por Canal"
                      to="ventas/canal"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                    {/* Por Producto */}
                    <ProtectedNav
                      type="dropdown"
                      name="Por Producto"
                      to="ventas/producto"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                    {/* Por Categría */}
                    <ProtectedNav
                      type="dropdown"
                      name="Por Categoría"
                      to="ventas/categoria"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                    {/* Por Unidades Mensuales */}
                    <ProtectedNav
                      type="dropdown"
                      name="Por Unidades Mensuales"
                      to="ventas/unidades-mensuales"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                  </NavDropdown>
                  {/* Producción */}
                  <NavDropdown title="Producción">
                    {/* Sugerido PT*/}
                    <ProtectedNav
                      type="dropdown"
                      name="Orden Sugerida - PT"
                      to="produccion/sugerido-pt"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                    {/* Sugerido Materiales */}
                    <ProtectedNav
                      type="dropdown"
                      name="Orden Sugerida - Materiales"
                      to="produccion/sugerido-ma"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                    {/* Unidades Producidas Mensuales */}
                    <ProtectedNav
                      type="dropdown"
                      name="Unidades Producidas Mensuales"
                      to="produccion/unidades-mensuales"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2, 3]}
                    />
                  </NavDropdown>
                  {/* Maestros */}
                  <NavDropdown title="Maestros">
                    {/* Productos */}
                    <ProtectedNav
                      type="dropdown"
                      name="Productos"
                      to="maestros/productos"
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                      roles={[1, 2]}
                    />
                  </NavDropdown>
                  {/* Posts */}
                  <ProtectedNav
                    name="Posts"
                    to="posts"
                    menuOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    roles={[1]}
                  />
                </Nav>
              </Nav>
              {/* Right side Nav */}
              {/* ------------- */}
              <Nav>
                <ProtectedNav
                  name="Info"
                  to="info"
                  menuOpen={menuOpen}
                  toggleMenu={toggleMenu}
                  roles={[1, 2, 3]}
                />
                {/* Admin */}
                <NavDropdown align="end" title="Admin">
                  {/* Usuarios */}
                  <ProtectedNav
                    type="dropdown"
                    name="Usuarios"
                    to="admin/usuarios"
                    menuOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    roles={[1]}
                  />
                  {/* Sesiones */}
                  <ProtectedNav
                    type="dropdown"
                    name="Sesiones"
                    to="admin/sesiones"
                    menuOpen={menuOpen}
                    toggleMenu={toggleMenu}
                    roles={[1]}
                  />
                </NavDropdown>
                {/* Perfil */}
                <NavDropdown
                  align="end"
                  title={
                    <GiChocolateBar size={22} style={{ color: "chocolate" }} />
                  }
                >
                  {/* Mi Perfil */}
                  <NavDropdown.Item
                    as={NavLink}
                    to="perfil"
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    <FaUserCog /> &nbsp;Mi Perfil
                  </NavDropdown.Item>
                  {/* Cambiar Contraseña */}
                  <NavDropdown.Item
                    as={NavLink}
                    to="pass"
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    <FaEdit /> &nbsp;Cambiar Contraseña
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt /> &nbsp;Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
