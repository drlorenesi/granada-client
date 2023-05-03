import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner animation='border' variant='secondary' />
    </div>
  );
}
