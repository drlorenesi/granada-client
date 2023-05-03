import { Route, Routes } from 'react-router-dom';
// Components
import Layout from './components/Layout';
import ProtectedOutlet from './components/ProtectedOutlet';
// Pages
// -----
// Login
import Login from './pages/login/Login';
import Registro from './pages/login/Registro';
import Solicitar from './pages/login/Solicitar';
import Gracias from './pages/login/Gracias';
import Verificar from './pages/login/Verificar';
import Enviado from './pages/login/Enviado';
import Reinicio from './pages/login/Reinicio';
import Exito from './pages/login/Exito';
// Generales
import Inicio from './pages/Inicio';
import Info from './pages/Info';
import NoExiste from './pages/NoExiste';
import NoAutorizado from './pages/NoAutorizado';
// Ventas
import PorCanal from './pages/ventas/PorCanal';
import PorProducto from './pages/ventas/PorProducto';
import PorCategoria from './pages/ventas/PorCategoria';
import PorUnidadesMensuales from './pages/ventas/PorUnidadesMensuales';
// Producción
import SugeridoPT from './pages/produccion/SugeridoPT';
import SugeridoMA from './pages/produccion/SugeridoMA';
import UnidadesMensuales from './pages/produccion/UnidadesMensuales';
// Maestros
import Productos from './pages/maestros/Productos';
import ProductoDetalle from './pages/maestros/ProductoDetalle';
// Usuario
import Perfil from './pages/usuario/Perfil';
import Pass from './pages/usuario/Pass';
// Admin
import Usuarios from './pages/admin/Usuarios';
import Usuario from './pages/admin/Usuario';
import Sesiones from './pages/admin/Sesiones';

// const roles = [
//   { nivel: 1, descripcion: 'Administrador' },
//   { nivel: 2, descripcion: 'Gerencia' },
//   { nivel: 3, descripcion: 'Ventas' },
//   { nivel: 4, descripcion: 'Producción' },
//   { nivel: 5, descripcion: 'Contabilidad' },
//   { nivel: 6, descripcion: 'Recursos Humanos' },
//   { nivel: 7, descripcion: 'Inventarios' },
//   { nivel: 10, descripcion: 'General' },
// ];

export default function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='registro' element={<Registro />} />
      <Route path='gracias' element={<Gracias />} />
      <Route path='verificar' element={<Verificar />} />
      <Route path='solicitar' element={<Solicitar />} />
      <Route path='enviado' element={<Enviado />} />
      <Route path='reinicio' element={<Reinicio />} />
      <Route path='exito' element={<Exito />} />
      {/* Logged in Routes */}
      <Route path='/' element={<Layout />}>
        {/* Generales */}
        <Route element={<ProtectedOutlet roles={[1, 2, 3, 10]} />}>
          <Route index element={<Inicio />} />
          <Route path='info' element={<Info />} />
          <Route path='perfil' element={<Perfil />} />
          <Route path='pass' element={<Pass />} />
          <Route path='noautorizado' element={<NoAutorizado />} />
        </Route>
        {/* Ventas */}
        <Route element={<ProtectedOutlet roles={[1, 2, 3]} />}>
          <Route path='ventas/canal' element={<PorCanal />} />
          <Route path='ventas/producto' element={<PorProducto />} />
          <Route path='ventas/categoria' element={<PorCategoria />} />
          <Route
            path='ventas/unidades-mensuales'
            element={<PorUnidadesMensuales />}
          />
        </Route>
        {/* Producción */}
        <Route element={<ProtectedOutlet roles={[1, 2, 3]} />}>
          <Route path='produccion/sugerido-pt' element={<SugeridoPT />} />
          <Route path='produccion/sugerido-ma' element={<SugeridoMA />} />
          <Route
            path='produccion/unidades-mensuales'
            element={<UnidadesMensuales />}
          />
        </Route>
        {/* Maestros */}
        <Route element={<ProtectedOutlet roles={[1]} />}>
          <Route path='maestros/productos' element={<Productos />} />
          <Route path='maestros/productos/:id' element={<ProductoDetalle />} />
        </Route>
        {/* Admin */}
        <Route element={<ProtectedOutlet roles={[1]} />}>
          <Route path='admin/usuarios' element={<Usuarios />} />
          <Route path='admin/usuarios/:id' element={<Usuario />} />
          <Route path='admin/sesiones' element={<Sesiones />} />
        </Route>
      </Route>
      {/* Catch All */}
      <Route path='*' element={<NoExiste />} />
    </Routes>
  );
}
