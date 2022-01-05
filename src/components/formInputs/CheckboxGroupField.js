import { Field, useField } from 'formik';
import Form from 'react-bootstrap/Form';

// Use for:
// Selecting an option from a radio button list
export default function CheckboxGroupField({ options, formText, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Field {...field} {...props}>
        {() =>
          options.map((option) => (
            <Form.Check
              inline
              type='checkbox'
              {...field}
              key={option.key}
              value={option.value}
              label={option.key}
              className={meta.touched && meta.error && 'form-check is-invalid'}
            />
          ))
        }
      </Field>
      <div>
        <Form.Text className='text-muted'>{formText}</Form.Text>
      </div>
      {meta.touched && meta.error && (
        <Form.Control.Feedback type='invalid'>
          {meta.error}
        </Form.Control.Feedback>
      )}
    </>
  );
}
