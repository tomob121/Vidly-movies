import axios from 'axios';
import { toast } from 'react-toastify';
import { log } from '../services/logger';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.statu < 500;

  if (expectedError) {
    log('Logging the error');
    toast.error('An unexpected error occured');
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt: setJwt,
};
