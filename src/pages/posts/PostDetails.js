import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import Button from 'react-bootstrap/Button';

const fetchPost = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

const fetchUser = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};

function PostDetails() {
  const { id } = useParams();

  const { isLoading, data, isError, error } = useQuery(
    ['post', id],
    () => fetchPost(id),
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
    }
  );

  const userId = data?.data.userId;

  const { data: user } = useQuery(['user', userId], () => fetchUser(userId), {
    enabled: !!userId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <h1>Post Details</h1>
      <div>
        <b>Title</b>: {data?.data.title}
      </div>
      <div>
        <b>Body</b>: {data?.data.body}
      </div>
      <div>
        <b>By</b>: {user?.data.name}
      </div>
      <br />
      <Link to='/posts'>
        <Button variant='primary'>Regresar</Button>
      </Link>
    </>
  );
}

export default PostDetails;
