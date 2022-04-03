import { Outlet, Navigate, useLocation } from 'react-router-dom';
// Context
import { useSession } from '../context/SessionContext';
import decodeSession from '../utils/decodeSession';

export default function PrivateOutlet({ roles }) {
  const { session } = useSession();
  const location = useLocation();

  const decoded = decodeSession(session);

  return roles?.includes(decoded.role) ? (
    <Outlet />
  ) : session ? (
    <Navigate to='/noautorizado' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}
