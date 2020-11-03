import { Message } from 'element-ui';
import store       from '../store';

export const showLoading = (options) => { store.commit('showLoading', options); };
export const hideLoading = () => { store.commit('hideLoading'); };
export const showTip = (text) => { Message(text); };
