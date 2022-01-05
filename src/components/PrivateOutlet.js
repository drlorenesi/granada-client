import { Outlet, Navigate } from 'react-router-dom';
import decodeSession from '../utils/decodeSession';

export default function PrivateOutlet({ session, roles }) {
  let decoded = decodeSession(session);
  return roles.includes(decoded.role) ? <Outlet /> : <Navigate to='/' />;
}
