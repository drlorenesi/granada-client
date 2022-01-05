import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

// Use for:
// Text, email, password, number and date inputs
export default function InputField({ type, placeholder, formText, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Control
        type={type}
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
