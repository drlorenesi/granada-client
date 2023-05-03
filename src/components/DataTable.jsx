import { useState, useRef } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useAsyncDebounce,
} from 'react-table';

import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { FaSortUp } from 'react-icons/fa';
import { FaSortDown } from 'react-icons/fa';
import { FaSort } from 'react-icons/fa';

import exportToExcel from '../utils/exportToExcel';
import copyToClipboard from '../utils/copyToClipboard';

import toast from 'react-hot-toast';

export default function DataTable({ columns, data, footer }) {
  // Create a "myRef" variable to select DOM item
  const myRef = useRef();
  // Function to copy data to clipboard
  const handleCopy = (ref) => {
    copyToClipboard(ref);
    toast.success('Copied to clipboard!');
  };
  // Function to convert spreadsheet to a binary data for download
  const handleDownload = (ref) => {
    exportToExcel(ref);
  };

  // React-Table Hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      // columns: useMemo(() => columns, []),
      // data: useMemo(() => data, []), // might not show updates
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Global Filter
  // -------------
  const { globalFilter, pageIndex, pageSize } = state;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200); // 200 millisecond delay after typing in search box

  // Result Display
  // --------------
  let from = state.pageIndex === 0 ? 1 : state.pageIndex * state.pageSize + 1;
  let to = state.pageIndex * state.pageSize + page.length;
  let mensaje = '';
  if (rows.length === 0) {
    mensaje = 'No hay resultados';
  } else if (rows.length === data.length) {
    mensaje = `Mostrando registros del ${from} al ${to} de un total de ${data.length}`;
  } else {
    mensaje = `Mostrando registros del ${from} al ${to} de un total de ${rows.length} (filtrados)`;
  }

  // Pagination
  // ----------
  let pagination = [];

  // Case 1: 7 pages (or less)
  // ------------------------
  if (pageCount <= 7) {
    for (let number = 2; number < pageCount; number++) {
      pagination.push(
        <Pagination.Item
          key={number}
          active={number === pageIndex + 1}
          onClick={() => gotoPage(number - 1)}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  // Case 2: 8 pages (exactly)
  // -------------------------
  if (pageCount === 8) {
    if (state.pageIndex + 1 <= 4) {
      for (let number = 2; number <= 5; number++) {
        pagination.push(
          <Pagination.Item
            key={number}
            active={number === pageIndex + 1}
            onClick={() => gotoPage(number - 1)}
          >
            {number}
          </Pagination.Item>
        );
      }
      pagination.push(<Pagination.Ellipsis key={'ellipsis'} disabled />);
    } else {
      for (let number = 4; number <= 7; number++) {
        pagination.push(
          <Pagination.Item
            key={number}
            active={number === pageIndex + 1}
            onClick={() => gotoPage(number - 1)}
          >
            {number}
          </Pagination.Item>
        );
      }
      pagination.unshift(<Pagination.Ellipsis key={'ellipsis'} disabled />);
    }
  }

  // Case 3: 9 pages (or more)
  // ------------------------
  if (pageCount >= 9) {
    if (state.pageIndex + 1 <= 4) {
      for (let number = 2; number <= 5; number++) {
        pagination.push(
          <Pagination.Item
            key={number}
            active={number === pageIndex + 1}
            onClick={() => gotoPage(number - 1)}
          >
            {number}
          </Pagination.Item>
        );
      }
      pagination.push(<Pagination.Ellipsis key={'ellipsis'} disabled />);
    } else if (pageCount - (state.pageIndex + 1) < 4) {
      for (let number = pageCount - 4; number < pageCount; number++) {
        pagination.push(
          <Pagination.Item
            key={number}
            active={number === pageIndex + 1}
            onClick={() => gotoPage(number - 1)}
          >
            {number}
          </Pagination.Item>
        );
      }
      pagination.unshift(<Pagination.Ellipsis key={'ellipsis'} disabled />);
    } else {
      pagination.push(<Pagination.Ellipsis key={'ellipsis1'} disabled />);
      for (
        let number = state.pageIndex;
        number <= state.pageIndex + 2;
        number++
      ) {
        pagination.push(
          <Pagination.Item
            key={number}
            active={number === pageIndex + 1}
            onClick={() => gotoPage(number - 1)}
          >
            {number}
          </Pagination.Item>
        );
      }
      pagination.push(<Pagination.Ellipsis key={'ellipsis2'} disabled />);
    }
  }

  return (
    <>
      {/* Show filas, Copy, Excel & Buscar... */}
      <div className='d-flex align-items-center justify-content-sm-between flex-sm-row flex-column'>
        <div className='mb-2'>
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title={`Mostrar ${pageSize} filas`}
              id='bg-nested-dropdown'
              variant='secondary'
            >
              {[15, 25, 50].map((pageSize) => (
                <Dropdown.Item
                  key={pageSize}
                  value={pageSize}
                  onClick={() => setPageSize(pageSize)}
                >
                  {pageSize}
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                key={data.length}
                value={data.length}
                onClick={() => setPageSize(data.length)}
              >
                Todas
              </Dropdown.Item>
            </DropdownButton>
            <Button variant='secondary' onClick={() => handleCopy(myRef)}>
              Copy
            </Button>
            <Button variant='secondary' onClick={() => handleDownload(myRef)}>
              Excel
            </Button>
          </ButtonGroup>
        </div>
        <div className='mb-2'>
          <Form>
            <FormControl
              type='search'
              placeholder='Buscar...'
              value={value || ''}
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
            />
          </Form>
        </div>
      </div>
      {/* Table */}
      <Row>
        <div>
          <Table
            ref={myRef}
            striped
            bordered
            hover
            size='sm'
            responsive
            style={{ fontSize: 14 }}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className='align-middle'
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className='d-flex justify-content-between align-items-center flex-nowrap'>
                        <div>{column.render('Header')}</div>
                        <div>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSortDown />
                            ) : (
                              <FaSortUp />
                            )
                          ) : (
                            <FaSort color='grey' />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className='table-group-divider'>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            {footer && (
              <tfoot className='table-group-divider'>
                {footerGroups.map((group) => (
                  <tr {...group.getFooterGroupProps()}>
                    {group.headers.map((column) => (
                      <td {...column.getFooterProps()}>
                        {column.render('Footer')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot>
            )}
          </Table>
        </div>
      </Row>
      {/* Pages */}
      <div className='d-flex align-items-center justify-content-sm-between flex-sm-row flex-column'>
        <div className='mb-2'>{mensaje}</div>
        <div>
          <Pagination>
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <Pagination.Item
              active={state.pageIndex + 1 === 1}
              onClick={() => gotoPage(0)}
            >
              1
            </Pagination.Item>
            {pagination}
            {pageCount === 0 || pageCount === 1 ? null : (
              <Pagination.Item
                active={state.pageIndex + 1 === pageCount}
                onClick={() => gotoPage(pageCount - 1)}
              >
                {pageCount}
              </Pagination.Item>
            )}
            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
}
