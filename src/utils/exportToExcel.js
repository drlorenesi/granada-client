import Blob from 'blob';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';

// Function to convert spreadsheet to a binary data for download
const s2ab = (s) => {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
// On click, handle export to Excel
export default function exportToExcel(ref) {
  // Get table
  let table = ref.current; // table is the id
  // Convert the table to an Excel sheet
  let wb = utils.table_to_book(table, { sheet: 'Hoja 1' });
  // Write sheet to blobl
  let blob = new Blob([s2ab(write(wb, { bookType: 'xlsx', type: 'binary' }))], {
    type: 'application/octet-stream',
  });
  // Return sheet file
  return saveAs(blob, 'download.xlsx');
}
