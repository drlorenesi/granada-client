import { Route, Routes } from 'react-router-dom';
// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PrivateOutlet from './components/PrivateOutlet';
// Context
import { useSession } from './context/SessionContext';
// Generales
import Inicio from './pages/Inicio';
import Info from './pages/Info';
import Perfil from './pages/Perfil';
import Pass from './pages/Pass';
import NoExiste from './pages/NoExiste';
// Ventas
import PorCanal from './pages/ventas/PorCanal';
import PorProducto from './pages/ventas/PorProducto';
import PorCategoria from './pages/ventas/PorCategoria';
// Inventarios
// import Productos from './pages/inventario/Productos';
// import Producto from './pages/inventario/Producto';
// Admin
import Usuarios from './pages/admin/Usuarios';
import Usuario from './pages/admin/Usuario';
import Sesiones from './pages/admin/Sesiones';
// Login
import Registro from './pages/login/Registro';
import Gracias from './pages/login/Gracias';
import Verificar from './pages/login/Verificar';
import Login from './pages/login/Login';
import Solicitar from './pages/login/Solicitar';
import Reinicio from './pages/login/Reinicio';
import Enviado from './pages/login/Enviado';
import Exito from './pages/login/Exito';
// Bootstrap
import Container from 'react-bootstrap/Container';

export default function App() {
  const { session } = useSession();

  if (session) {
    return (
      <div className='d-flex flex-column min-vh-100'>
        <Navigation session={session} />
        <Container className='flex-shrink-0 mb-3' fluid>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/pass' element={<Pass />} />
            <Route path='/info' element={<Info />} />
            <Route path='/reinicio' element={<Reinicio />} />
            {/* Private Routes */}
            {/* -------------- */}
            {/* Ventas */}
            <Route
              path='/ventas'
              element={<PrivateOutlet session={session} roles={[1, 2]} />}
            >
              <Route path='canal' element={<PorCanal />} />
              <Route path='producto' element={<PorProducto />} />
              <Route path='categoria' element={<PorCategoria />} />
            </Route>
            {/* Inventarios */}
            {/* <Route
              path='/inventario'
              element={<PrivateOutlet session={session} roles={[1, 2]} />}
            >
              <Route path='productos' element={<Productos />} />
              <Route path='productos/:id' element={<Producto />} />
            </Route> */}
            {/* Admin */}
            <Route
              path='/admin'
              element={<PrivateOutlet session={session} roles={[1]} />}
            >
              <Route path='usuarios' element={<Usuarios />} />
              <Route path='usuarios/:id' element={<Usuario />} />
              <Route path='sesiones' element={<Sesiones />} />
            </Route>
            {/* -------------- */}
            <Route path='*' element={<NoExiste />} />
          </Routes>
        </Container>
        <footer className='mt-auto py-3 bg-light'>
          <Footer />
        </footer>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path='/registro' element={<Registro />} />
        <Route path='/gracias' element={<Gracias />} />
        <Route path='/verificar' element={<Verificar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/solicitar' element={<Solicitar />} />
        <Route path='/enviado' element={<Enviado />} />
        <Route path='/reinicio' element={<Reinicio />} />
        <Route path='/exito' element={<Exito />} />
        <Route path='*' element={<Login />} />
      </Routes>
    );
  }
}
