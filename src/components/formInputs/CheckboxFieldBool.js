import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function CheckboxFieldBool({ control, name, label, message }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Form.Check
            type='checkbox'
            label={label}
            value='true'
            isInvalid={fieldState.error}
            {...field}
          />
          <div className='text-danger'>
            <small>{fieldState?.error?.message}</small>
          </div>
          <Form.Text className='text-muted'>{message}</Form.Text>
        </>
      )}
    />
  );
}
