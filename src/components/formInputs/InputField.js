import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function Input({
  control,
  name,
  type,
  placeholder,
  message,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Form.Control
            type={type}
            placeholder={placeholder}
            isInvalid={fieldState.error}
            {...field}
            {...props}
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
