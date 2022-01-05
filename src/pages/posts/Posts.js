import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const fetchPosts = (rows, pageNumber) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=${rows}&_page=${pageNumber}`
  );
};

function Posts(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [rows, setRows] = useState('10');
  const items = [
    { label: '10 Rows', value: 10 },
    { label: '15 Rows', value: 15 },
    { label: '20 Rows', value: 20 },
    { label: '25 Rows', value: 25 },
  ];

  const handleChange = (event) => {
    setRows(event.target.value);
    setPageNumber(1);
  };

  const { isLoading, data, isError, error } = useQuery(
    ['posts', rows, pageNumber],
    () => fetchPosts(rows, pageNumber),
    {
      enabled: true, // Default: true
      cacheTime: 1000 * 60 * 5, // Default: 5 mins
      staleTime: 0, // Default: 0 seconds
      refetchOnMount: true, // Default: true
      refetchOnWindowFocus: true, // Default: true
      // Polling Properties
      refetchInterval: false, // Default: false
      refetchIntervalInBackground: false, // Default: false
      // Success and Error Callbacks
      // onSuccess,
      // onError
      // Maintain Data from last successful fetch
      // keepPreviousData: true
    }
  );

  const { data: next } = useQuery(['posts', rows, pageNumber + 1], () =>
    fetchPosts(rows, pageNumber + 1)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <h1>Posts</h1>
      <Form.Group as={Row} className='mb-2'>
        <Form.Label xs='auto' column>
          Fetch
        </Form.Label>
        <Col xs='auto'>
          <Form.Select defaultValue={rows} onChange={handleChange}>
            {items.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
      {data?.data.map((post) => {
        return (
          <div key={post.id}>
            {post.id} - <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </div>
        );
      })}
      <br />
      <div>
        <Button
          variant='primary'
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>{' '}
        <Button
          variant='primary'
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={next?.data.length === 0}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default Posts;
