import router                            from '@/router';
import store                             from '@/store';
import Axios                             from './axios';
import { sleep, isSuccess, isNeedRetry } from './utils';

export async function forResponse(response) {
  if (isSuccess(response)) return Promise.resolve(response);
  if (isNeedRetry(response)) {
    response.config.retry -= 1;
    await sleep(response.config.retryInterval);
    return Axios(response.config);
  }
  return Promise.reject(response);
}
export async function forError(error) {
  if (error?.response?.status === 403) {
    store.commit('savePathBeforeLogin', router.currentRoute);
    router.push('/Login');
    return Promise.reject(error);
  }
  if (isNeedRetry(error)) {
    error.config.retry -= 1;
    await sleep(error.config.retryInterval);
    return Axios(error.config);
  }
  return Promise.reject(error);
}

export function forConfig(config) {
  config.headers.FromSystem    = 1;
  const Authorization          = (store.state.login.userInfo ?? {}).token;
  config.headers.Authorization = Authorization;
  if (config.retryInterval < 200) {
    config.retryInterval = 200;
    console.info('%c请求重试间隔时间过短,已被重置为200ms', 'color: yellow; background: #999999');
  }
  if (config.retry > 5) {
    config.retry = 5;
    console.info('c%请求重试次数过高,已被重置为5', 'color: yellow; background: #999999');
  }
  return config;
}
