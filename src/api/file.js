import excutor from './index';

export const upload =  (data, cancel) => excutor.post({
  url: 'cos/upload', data, cancel, loading: false, feedback: true,
});
