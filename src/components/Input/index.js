/**
 * ======================================================================
 * 此类组件用于表单填写/列表筛选等场景,配合elementUI-form使用
 * 有些基础组件是elementUI提供的,此处不再重新实现
 * elementUI未提供的组件,或者需以组合形式使用的组件,在这里封装,以单个标签的形式暴露
 * 组件至少实现以下api:
 * 1. v-model
 * 2. disabled
 * 根据不同的组件类型,可能会提供额外的api,和elementUI保持一致
 * 组件的命名遵循以下规则:
 * 1. 文件名使用小驼峰命名,组件名用小写加连字符
 * 2. 多选/单选框: xx-group
 * 3. 输入: xx-input
 * 4. 和保留字冲突的:加 form- 前缀
 * 5. 不直接用于业务的基础组件:文件名大写,用下划线连接,组件不命名,以避免暴露到全局
 * ======================================================================
 */
import Vue from 'vue';

const inputs         = [];
const moduleContexts = require.context('.', false, /\.vue$/);
moduleContexts.keys().forEach((component) => {
  const componentModule = moduleContexts(component).default;
  if (componentModule.name) {
    inputs.push(componentModule); // 只暴露命名的组件
  }
});

export default function () {
  for (const i of inputs) {
    Vue.component(i.name, i);
  }
}
