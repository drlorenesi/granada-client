import { useField, useFormikContext } from 'formik';
// React Currency Input Field Component
import CurrencyInput from 'react-currency-input-field';

// Use for:
// Currency Input
export default function CurrencyField(props) {
  const { setFieldValue } = useFormikContext();
  const [field, meta, values] = useField(props);
  return (
    <>
      <CurrencyInput
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? 'form-control is-invalid'
            : 'form-control'
        }
        // defaultValue={1000}
        prefix='$ '
        // decimalsLimit={2}
        // maxLength={6}
        // disabled={true}
        value={values.name}
        // onBlur={({ target }) => console.log(target.value)}
        onValueChange={(value, name) => {
          setFieldValue(name, value);
        }}
      />
      {meta.touched && meta.error ? (
        <div>
          <small className='text-danger'>{meta.error}</small>
        </div>
      ) : null}
    </>
  );
}
