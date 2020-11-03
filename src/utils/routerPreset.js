import store from '../store.js';

export default function (router) {
  router.beforeEach((to, from, next) => {
    const authed   = !!store.state.login.userInfo;
    const needAuth = to.meta && to.meta.auth;
    if (needAuth && !authed) {
      store.commit('savePathBeforeLogin', to);
      next({
        path: '/Login',
      });
    } else {
      next();
    }
  });
}
