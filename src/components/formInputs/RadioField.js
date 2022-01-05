import { Field, useField } from 'formik';
import Form from 'react-bootstrap/Form';

// Use for:
// Selecting an option from a radio button list
export default function RadioField({ options, formText, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Field {...field} {...props}>
        {() =>
          options.map((option) => (
            <Form.Check
              type='radio'
              {...field}
              key={option.key}
              value={option.value}
              label={option.key}
              className={meta.touched && meta.error && 'form-check is-invalid'}
            />
          ))
        }
      </Field>
      <Form.Text className='text-muted'>{formText}</Form.Text>
      {meta.touched && meta.error && (
        <Form.Control.Feedback type='invalid'>
          {meta.error}
        </Form.Control.Feedback>
      )}
    </>
  );
}
