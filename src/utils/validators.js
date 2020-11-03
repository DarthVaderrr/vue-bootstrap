export const mobile = {
  pattern: /^1[3456789]{1}\d{9}$/, required: true, message: '手机号码形如：13838383838',
};
export const number = {
  pattern: /^[+|-]?\d+\.\d+$/, required: true, message: '请输入数字',
};
export const posInteger = {
  pattern: /^[+]?\d+$/, required: true, message: '请输入正整数',
};
export const integer = {
  pattern: /^[+|-]?\d+$/, required: true, message: '请输入整数',
};

export const IP = {
  pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
  required: true,
  message: 'IP地址输入示例，形如：192.168.001.123。',
};
