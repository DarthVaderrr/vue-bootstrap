import router from '../router';

const userInfoJSON = JSON.parse(localStorage.getItem('userInfo'));
export default {
  name: 'login',
  state: {
    userInfo: userInfoJSON,
    to: { path: '/' },
  },
  mutations: {
    login(state, data) {
      const userInfo = { ...data };
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      router.push(state.to);
    },
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      router.push('/Login');
    },
    savePathBeforeLogin(state, to) {
      state.to = to;
    },
  },
  actions: {},
};
