import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function Checkbox({ control, name, options, message }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {options.map((option) => (
            <Form.Check
              key={option.value}
              label={option.key}
              type='checkbox'
              value={option.value}
              checked={field.value?.some((val) => val === option.value)}
              isInvalid={fieldState.error}
              onChange={(e) => {
                if (e.target.checked) {
                  field.onChange([...field.value, e.target.value]);
                } else {
                  field.onChange(
                    field.value.filter((value) => value !== e.target.value)
                  );
                }
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
