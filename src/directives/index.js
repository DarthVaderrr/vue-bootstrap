import Vue from 'vue';

const directives     = [];
const moduleContexts = require.context('.', false, /\.js$/);
moduleContexts.keys().filter((i) => i !== './index.js').forEach((directive) => {
  directives.push(moduleContexts(directive).default);
});
export default function () {
  directives.forEach((directive) => {
    Vue.directive(directive.name, directive);
  });
}
