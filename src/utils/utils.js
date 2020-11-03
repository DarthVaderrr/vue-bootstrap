import moment                                from 'moment';
import { showLoading, hideLoading, showTip } from './feedback';
import Axios                                 from './axios';

// 复制文字到剪贴板
export function copyText(text) {
  const inputElement =  document.createElement('input');
  document.body.appendChild(inputElement);
  inputElement.value = text;
  inputElement.select();
  document.execCommand('Copy');
  inputElement.remove();
  showTip('内容已复制到剪贴板');
}

// 预览二进制文件
export function getObjectURL(file) {
  let url = null;
  if (window.createObjectURL !== undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * 接口传参专用格式化,输出固定格式:YYYY-MM-DD HH:mm:ss
 * @param  date 可被moment识别的date值,不传则默认是now
 * @returns YYYY-MM-DD HH:mm:ss 格式的时间字符串
 */
export function getTimeStr(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

// 多选的字段值,转换成字符串
function stringfyList(formData) {
  for (const i in formData) {
    if (Array.isArray(formData[i])) {
      formData[i] = formData[i].join(',');
    }
  }
}

// 通过xhr实现表格导出
export async function exportData(formData, url, cancelToken = { token: null }) {
  showLoading({ lock: true });
  stringfyList(formData);
  Axios({
    method: 'post',
    data: formData,
    transformRequest: [function (data) {
      let ret = '';
      for (const it in data) {
        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
      }
      return ret;
    }],
    cancelToken: cancelToken.token,
    url,
    responseType: 'arraybuffer',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    const { headers, data } = res;
    console.log(headers);
    const disp     = headers['Content-Disposition'] || headers['content-disposition'] || 'attachment;filename=未知文件.xlsx';
    const fileName = decodeURI(disp.substring(20));
    const blob     = new Blob([data], { type: headers['Content-Type'] || headers['content-type'] });
    const link     = document.createElement('a');
    link.href      = getObjectURL(blob);
    link.download  = fileName;
    link.click();
    link.remove();
  }).catch((err) => {
    console.error(err);
    if (err.constructor.name !== 'Cancel') {
      showTip(`下载失败: ${err?.response?.data.message ?? err.message}`);
    }
  }).finally(() => {
    hideLoading();
  });
}

// 通过原生表单实现表格导出; 除非xhr方案出现兼容问题,否则不使用
export function exporDataByRawForm(formData, url) {
  stringfyList(formData);
  const form = document.createElement('form');
  for (const i in formData) {
    form.innerHTML += `<input value="${formData[i]}" name="${i}" id="${i}"/>`;
  }
  form.action = `${process.env.VUE_APP_API_BASE_URL}/${url}`;
  form.method = 'post';
  document.body.appendChild(form);
  form.submit();
  form.remove();
  hideLoading();
}

export function initConditions(items) {
  const formData = {};
  for (const i of items) {
    if (i.keyMin) {
      formData[i.keyMin] = i.value[0];
      formData[i.keyMax] = i.value[1];
    } else {
      formData[i.key] = i.value;
    }
  }
  return formData;
}

export function initEditFormItems(dataTobeEdit, items) {
  for (const i of items) {
    if (i.keyMin) {
      i.value = [dataTobeEdit[i.keyMin], dataTobeEdit[i.keyMax]];
    } else {
      i.value = dataTobeEdit[i.key];
    }
  }
  return items;
}

export const isCancel = (err) => err.constructor.name === 'Cancel';
export const isError = (err) => err.constructor.name === 'Error';
export const isObject = (err) => err.constructor.name === 'Object';
export const isSuccess = ({ data }) => {
  if (!data) return false;
  if (data.constructor.name === 'ArrayBuffer') return true;
  const { code } = data;
  if (code >= 200 && code < 400) return true;
  return false;
};
export const isNeedRetry = (response) => {
  if (isCancel(response)) return false;
  if (response.config.retry <= 0) return false;
  if (isObject(response)) return response.data.code >= 500;
  if (isError(response)) return response.response.status >= 500;
  return false;
};
export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
