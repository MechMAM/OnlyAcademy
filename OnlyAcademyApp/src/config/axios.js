import axios from 'axios';

export default axios.create({
  // baseURL: 'http://172.16.3.200:8080',
  withCredentials: false,
});
