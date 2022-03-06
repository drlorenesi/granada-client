import { Outlet, Navigate, useLocation } from 'react-router-dom';
import decodeSession from '../utils/decodeSession';

export default function PrivateOutlet({ session, roles }) {
  const location = useLocation();
  const decoded = decodeSession(session);

  return roles.includes(decoded.role) ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ path: location.pathname }} />
  );
}
