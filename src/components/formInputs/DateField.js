import { useField, useFormikContext } from 'formik';
// Datepicker and Locale
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

// Use for:
// Advanced date inputs
export default function DateField(props) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <DatePicker
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? 'form-control is-invalid'
            : 'form-control'
        }
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        locale='es'
        dateFormat='dd/MM/yyyy'
        showWeekNumbers
        todayButton='Hoy'
        isClearable
      />
      {meta.touched && meta.error && (
        <div>
          <small className='text-danger'>{meta.error}</small>
        </div>
      )}
    </>
  );
}
