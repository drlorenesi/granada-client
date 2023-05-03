import jwt_decode from 'jwt-decode';

export default function decodeSession(session) {
  try {
    let decoded = jwt_decode(session);
    return decoded;
  } catch (error) {
    return false;
  }
}
