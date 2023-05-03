import { useLocation, Navigate, Outlet } from 'react-router-dom';
// Auth Hook
import { useAuth } from '../context/AuthContext';
// Utils
import decodeSession from '../utils/decodeSession';

export default function ProtectedOutlet({ roles }) {
  let { auth } = useAuth();
  let location = useLocation();
  let decoded = decodeSession(auth);

  // (60*5) = 6 mins to check auth
  // Nota: debe ser mayor al tiempo de vida del 'access token'
  // let refresh = (new Date() - decoded?.iat * 1000) / 1000 > 60 * 6;
  // console.log('refresh', refresh);
  // useAuthCheck(refresh);

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return roles?.includes(decoded.role) ? (
    <Outlet />
  ) : (
    <Navigate to='/noautorizado' state={{ from: location }} replace />
  );
}
