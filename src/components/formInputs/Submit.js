import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Submit({ name, isSubmitting, error }) {
  return (
    <Button variant='primary' type='submit' disabled={isSubmitting || error}>
      {isSubmitting ? (
        <span>
          <Spinner animation='border' size='sm' /> {name}
        </span>
      ) : (
        name
      )}
    </Button>
  );
}
