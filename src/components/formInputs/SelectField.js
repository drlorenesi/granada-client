import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function SelectField({
  control,
  name,
  options,
  message,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Form.Select isInvalid={fieldState.error} {...field} {...props}>
            <option key='- Seleccionar -' value=''>
              - Seleccionar -
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {fieldState.error?.message}
          </Form.Control.Feedback>
          <Form.Text className='text-muted'>{message}</Form.Text>
        </>
      )}
    />
  );
}
