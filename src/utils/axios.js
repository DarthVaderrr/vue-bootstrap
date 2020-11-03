import axios                                from 'axios';
import { forResponse, forError, forConfig } from './interceptors';

const baseURL          = process.env.VUE_APP_API_BASE_URL;
const Axios            = axios.create({ baseURL });
Axios.defaults.timeout = 60000;
Axios.interceptors.request.use(forConfig);
Axios.interceptors.response.use(forResponse, forError);

export default Axios;
