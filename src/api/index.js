import request from '../utils/request';

const METHODS =  ['get', 'post', 'delete', 'put'];
const excutor = (args) => request({ method: 'get', ...args });
METHODS.forEach((method) => {
  excutor[method] = (args) => request({ method, ...args });
});

export default excutor;
