import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

// Use for:
// Selecting a single field
export default function CheckboxField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <Form.Check
      label={label}
      isInvalid={meta.touched && meta.error}
      feedback={meta.error}
      feedbackType='invalid'
      {...field}
      {...props}
    />
  );
}
