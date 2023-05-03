import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
// Datepicker and Locale
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

export default function Input({ control, name, message, ...props }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <>
          <Form.Control
            as={ReactDatePicker}
            isInvalid={fieldState.error}
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            locale='es'
            dateFormat='dd/MM/yyyy'
            todayButton='Hoy'
            calendarStartDay={0}
            isClearable
            // showWeekNumbers
            // Do not show keyboard on smaller devices
            onFocus={(e) =>
              window.screen.width <= 768 ? e.target.blur() : null
            }
            showYearDropdown
            yearDropdownItemNumber={7}
            scrollableYearDropdown
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
