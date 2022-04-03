import { Route, Routes } from 'react-router-dom';
// Components
import Layout from './components/Layout';
import PrivateOutlet from './components/PrivateOutlet';
// Login
import Registro from './pages/login/Registro';
import Gracias from './pages/login/Gracias';
import Verificar from './pages/login/Verificar';
import Login from './pages/login/Login';
import Solicitar from './pages/login/Solicitar';
import Reinicio from './pages/login/Reinicio';
import Enviado from './pages/login/Enviado';
import Exito from './pages/login/Exito';
// Generales
import Inicio from './pages/Inicio';
import Info from './pages/Info';
import Perfil from './pages/Perfil';
import Pass from './pages/Pass';
import NoExiste from './pages/NoExiste';
import NoAutorizado from './pages/NoAutorizado';
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

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='login' element={<Login />} />
      <Route path='registro' element={<Registro />} />
      <Route path='gracias' element={<Gracias />} />
      <Route path='verificar' element={<Verificar />} />
      <Route path='solicitar' element={<Solicitar />} />
      <Route path='enviado' element={<Enviado />} />
      <Route path='reinicio' element={<Reinicio />} />
      <Route path='exito' element={<Exito />} />
      {/* Protected Routes */}
      <Route path='/' element={<Layout />}>
        {/* Generales */}
        <Route element={<PrivateOutlet roles={[1, 2]} />}>
          <Route path='/' element={<Inicio />} />
          <Route path='perfil' element={<Perfil />} />
          <Route path='pass' element={<Pass />} />
          <Route path='info' element={<Info />} />
          <Route path='reinicio' element={<Reinicio />} />
        </Route>
        {/* Ventas */}
        <Route element={<PrivateOutlet roles={[1, 2]} />}>
          <Route path='ventas/canal' element={<PorCanal />} />
          <Route path='ventas/producto' element={<PorProducto />} />
          <Route path='ventas/categoria' element={<PorCategoria />} />
        </Route>
        {/* Admin */}
        <Route element={<PrivateOutlet roles={[1, 2]} />}>
          <Route path='admin/usuarios' element={<Usuarios />} />
          <Route path='admin/usuarios/:id' element={<Usuario />} />
          <Route path='admin/sesiones' element={<Sesiones />} />
        </Route>
        {/* No Autorizado */}
        <Route path='noautorizado' element={<NoAutorizado />} />
      </Route>
      {/* Catch All */}
      <Route path='*' element={<NoExiste />} />
    </Routes>
  );
}
