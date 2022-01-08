// expected output: miércoles 22/12/2021 8:01:16 p. m.
export const formatDateLong = (date) =>
  new Intl.DateTimeFormat('es-GT', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h12',
  }).format(date);

// expected output: 1/1/2022 19:03:10
export const formatDateMed = (date) =>
  new Intl.DateTimeFormat('es-GT', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);

// expected output: 1/1/2022
export const formatDateShort = (date) =>
  new Intl.DateTimeFormat('es-GT', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date);

// expected output: 2022-01-31
export const formatDateISO = (date) => date.toISOString().split('T')[0];

// expected output: 2022-01-31
export const formatDateISOLocal = (date) => {
  let z = date.getTimezoneOffset() * 60 * 1000;
  let local = new Date(date - z).toISOString().split('T')[0];
  return local;
};

// expected output: 123,456,789.00
export const formatDec = (num) =>
  new Intl.NumberFormat('es-GT', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(num);

// expected output: QTZ 123,456,789.00
export const formatQ = (num) =>
  new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'QTZ',
  }).format(num);

// expected output: 100.0%
export const formatP = (num) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(num);
