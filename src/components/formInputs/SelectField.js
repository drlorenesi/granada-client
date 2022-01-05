import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

// Use for:
// Selecting an option from a dropdown list
export default function SelectField({ options, formText, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Select isInvalid={meta.touched && meta.error} {...field} {...props}>
        <option key='-Seleccionar-' value=''>
          - Seleccionar -
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </Form.Select>
      <Form.Text className='text-muted'>{formText}</Form.Text>
      {meta.touched && meta.error && (
        <Form.Control.Feedback type='invalid'>
          {meta.error}
        </Form.Control.Feedback>
      )}
    </>
  );
}
