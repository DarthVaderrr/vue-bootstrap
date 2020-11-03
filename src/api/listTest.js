import excutor from './index';

export const queryList = (data, cancel) => excutor.post({
  url: 'query', data, cancel,
});
export const deleteItem = (data) => excutor.delete({
  url: 'delete', data, feedback: true,
});
export const updateItem = (data) => excutor.put({
  url: 'update', data, feedback: true,
});
export const addItem = (data) => excutor.post({
  url: 'post', data, feedback: true,
});
export const getItem = (data, cancel) => excutor.post({
  url: 'get', data, cancel,
});
