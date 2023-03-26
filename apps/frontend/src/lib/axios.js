import Axios from 'axios';
import toast from "react-hot-toast";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const writingMethods = ['post', 'put', 'patch', 'delete'];

function isWritingRequest(method) {
  return writingMethods.includes(method);
}

const onRequest = (config) => {
  config.headers['Content-Language'] = 'en';

  if (isWritingRequest(config.method)) {
    return axios.get('/csrf-cookie').then(() => config);
  }

  return config;
};

axios.interceptors.request.use(onRequest, null);

export const handleException = (error) => {
  toast.error(error.response?.data?.message || 'Something went wrong');
}

export default axios;

export const defaultFetcher = (url) => axios.get(url).then((res) => res.data);
