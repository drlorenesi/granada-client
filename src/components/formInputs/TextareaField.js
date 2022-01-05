import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

// Use for:
// Text area fields
export default function TextareaField({ placeholder, formText, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Control
        as='textarea'
        style={{ height: '100px' }}
        placeholder={placeholder}
        isInvalid={meta.touched && meta.error}
        {...field}
        {...props}
      />
      <Form.Text className='text-muted'>{formText}</Form.Text>
      {meta.touched && meta.error && (
        <Form.Control.Feedback type='invalid'>
          {meta.error}
        </Form.Control.Feedback>
      )}
    </>
  );
}
