import request from '../utils/request';

const METHODS =  ['get', 'post', 'delete', 'put'];
/**
 *
 * @param String method  请求方法
 * @param String url   请求url
 * @param Object data   请求参数
 * @param Object cancel  CancelTokenSource,用于取消此次请求
 * @param Boolean loading  是否loading
 * @param Boolean feedback   是否反馈
 * @param Object headers   headers
 * @param Number retry   重试次数
 * @param Number retryInterval   重试间隔 单位:ms
 * @returns 用Promise包裹的请求结果,如果请求失败,为null,如果请求成功但是该请求没有回传数据,则为true
 */
const excutor = (args) => request({ method: 'get', ...args });
METHODS.forEach((method) => {
  excutor[method] = (args) => request({ method, ...args });
});

export default excutor;
