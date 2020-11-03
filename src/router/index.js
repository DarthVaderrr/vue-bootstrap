import Vue          from 'vue';
import VueRouter    from 'vue-router';
import Login        from '../views/Login/index.vue';
import AppConatiner from '../components/Layouts/AppConatiner';
import NotFound     from '../views/NotFound';

Vue.use(VueRouter);
/**
 * ============================================================== *
 * 自动引入所有router配置,除了此文件以外的js文件都会被作为router配置处理   *
 * ============================================================== *
 */
const auth           = true;
const routers        = [];
const moduleContexts = require.context('.', false, /\.js$/);
moduleContexts.keys().filter((i) => i !== './index.js').forEach((route) => {
  routers.push(moduleContexts(route).default);
});

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: AppConatiner,
      redirect: '/TestPage',
      meta: {
        title: '首页',
        auth,
      },
      children: routers,
    },
    {
      path: '/Login',
      component: Login,
    },
    {
      path: '/404',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
