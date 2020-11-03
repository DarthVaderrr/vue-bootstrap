import excutor from './index';

export const login = (data) => excutor.post({
  url: 'login', data, feedback: true,
});

export const queryUser = (data) => excutor({
  url: 'admin_user', data,
});
