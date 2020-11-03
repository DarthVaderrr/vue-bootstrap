import Axios                        from '@utils/axios';
import { Message }                  from 'element-ui';
import { showLoading, hideLoading } from './feedback';
import { isCancel }                 from './utils';

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
async function request({
  method,
  url,
  data = {},
  cancel = { token: null },
  loading = true,
  feedback = false,
  headers = {},
  retry = 1,
  retryInterval = 500,
}) {
  if (loading) showLoading(loading);
  let result = null;
  try {
    const res      = await Axios({
      method,
      url,
      data,
      cancelToken: cancel.token,
      headers,
      retry,
      retryInterval,
    });
    const { code } = res.data;
    if (code >= 200 && code < 400) {
      result = res.data.data || { success: true };
      if (feedback) {
        Message.success(res.data.message ?? '请求成功');
      }
    } else {
      throw new Error(res.message || res.data.message || 'network error');
    }
  } catch (err) {
    console.error(err);
    if (isCancel(err)) {
      console.info(`%c请求取消: ${err.message}`, 'color: yellow; background: #999999');
    } else {
      const MESSAGE = `请求失败: ${err?.response?.data.message ?? err.message}`;
      Message.error(MESSAGE);
    }
  }
  hideLoading();
  return result;
}

export default request;
