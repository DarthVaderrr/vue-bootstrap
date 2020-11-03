import TestPage       from '../views/TestPage/index';
import TestPageList   from '../views/TestPage/list';
import TestPageDetail from '../views/TestPage/detail';

const auth = true;
export default {
  path: '/TestPage',
  component: TestPage,
  redirect: '/TestPage/list',
  meta: {
    title: '测试页面',
  },
  children: [
    {
      path: 'list',
      component: TestPageList,
      meta: {
        title: '列表',
        auth,
      },
    },
    {
      path: 'detail',
      component: TestPageDetail,
      meta: {
        title: '详情',
        auth,
      },
    },

  ],
};
