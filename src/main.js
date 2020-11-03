/**
 * ========================================================================
 * 开发约定:
 * 1.所有项目开发人员须使用相同的项目配置,产出统一风格的代码,如需修改配置,需共同商定
 * 2.布局方式: 以flex 和 grid 为主,原则上不使用float/position布局
 * 3.状态管理:
 *    1.必须通过vuex进行状态共享,组件内只允许出现自上而下的数据流
 *    2.禁止修改store入口文件,状态应该在src/models/目录下创建模块,并且对模块命名
 * 4.vue api 注意事项:
 *    1.禁止使用extend继承其他业务组件 ,但可以通过extend复用非业务组件的逻辑
 *    2.禁止使用以下api:
 *      1.keep-alive
 *      2.$parent
 *      3.禁止使用自定义组件的$ref访问其方法和属性,$ref仅限用于原生节点
 *      4.全局的mixin
 * 5.命名方式:
 *    1.html类名 小写+连字符连接
 *    2.js变量名 普通变量:小驼峰  常量:小驼峰或者 大写+下划线连接
 *    3.变量不得使用下划线开头
 *    4.css变量: 小写+连字符连接
 *    5.命名应符合语义,不得随意命名
 * 6.新增依赖必须save,更新依赖需共同商定,不得擅自更改依赖版本
 * ========================================================================
 */
import Vue          from 'vue';
import ElementUI    from 'element-ui';
import App          from './App.vue';
import store        from './store';
import router       from './router';
import Layouts      from './components/Layouts';
import Input        from './components/Input';
import routerPreset from './utils/routerPreset.js'; // 全局的路由守卫
import { abort }    from './utils/mixins';
import directives   from './directives';
import filters      from './filters';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/layout.css';
import './mock';

Vue.mixin(abort); // 警告⚠️:全局的混入可能会造成性能问题
Vue.use(directives);
Vue.use(filters);
Vue.use(routerPreset.bind(null, router));
Vue.use(ElementUI);
Vue.use(Layouts);
Vue.use(Input);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
