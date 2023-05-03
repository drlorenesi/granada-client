import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function RadioField({ control, name, options, message }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {options?.map((option) => (
            <Form.Check
              type='radio'
              key={option.key}
              value={option.value}
              label={option.key}
              isInvalid={fieldState.error}
              checked={field.value === option.value}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
          ))}
          <div className='text-danger'>
            <small>{fieldState?.error?.message}</small>
          </div>
          <Form.Text className='text-muted'>{message}</Form.Text>
        </>
      )}
    />
  );
}
