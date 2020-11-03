import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/**
 * 以下代码会自动引入models目录下的所有模块,并合为一个store
 */
const modules        = {};
const moduleContexts = require.context('./models', false, /\.js$/);
moduleContexts.keys().forEach((model) => {
  const storeModule         = moduleContexts(model).default;
  modules[storeModule.name] = storeModule;
});

export default new Vuex.Store({
  modules,
  state: {},
  mutations: {},
  actions: {},
});
