import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function CheckboxFieldVal({
  control,
  name,
  label,
  values,
  message,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Form.Check
            type='checkbox'
            label={label}
            value={field.value}
            checked={field.value === values.checked}
            isInvalid={fieldState.error}
            onChange={(e) => {
              if (e.target.checked) {
                field.onChange(values.checked, field.value);
              } else {
                field.onChange(values.unChecked, field.value);
              }
            }}
            {...props}
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
