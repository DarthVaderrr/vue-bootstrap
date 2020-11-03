import Vue    from 'vue';
import moment from 'moment';

function datetime(val) {
  return moment(new Date(val - 0)).format('YYYY-MM-DD HH:mm:ss');
}
function date(val) {
  return moment(new Date(val - 0)).format('YYYY-MM-DD');
}
/**
 * filter必须是具名函数
 */
const filters        = [datetime, date];
const moduleContexts = require.context('.', false, /\.js$/);
moduleContexts.keys().filter((i) => i !== './index.js').forEach((filter) => {
  filters.push(moduleContexts(filter).default);
});
export default function () {
  filters.forEach((filter) => {
    Vue.filter(filter.name, filter);
  });
}
