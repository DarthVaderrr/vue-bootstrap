import Vue  from 'vue';
import Form from '../Form';

const layouts        = [Form];
const moduleContexts = require.context('.', false, /\.vue$/);
moduleContexts.keys().forEach((component) => {
  const componentModule = moduleContexts(component).default;
  if (componentModule.name) {
    layouts.push(componentModule); // 只处理命名的组件,未命名的会报错
  }
});

export default function () {
  for (const i of layouts) {
    Vue.component(i.name, i);
  }
}
