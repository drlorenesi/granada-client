import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function TextareaField({ control, name, placeholder, message }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder={placeholder}
            isInvalid={fieldState.error}
            {...field}
          />
          <Form.Control.Feedback type='invalid'>
            {fieldState.error?.message}
          </Form.Control.Feedback>
          <Form.Text className='text-muted'>{message}</Form.Text>
        </>
      )}
    />
  );
}
