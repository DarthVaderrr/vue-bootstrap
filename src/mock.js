import Mock from 'mockjs';

Mock.mock('/mock/login', 'post', {
  code: 200,
  data: {
    isSuperAdmin: 0,
    mobile: '1909xxxx099',
    realName: '王大壮2',
    sex: 0,
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..qsQ9AATF4gBXtB0XEc3gIL41qGLYkRiz2YnI_vdDDdw',
    userId: 2,
    userName: 'test1231',
    userStatus: 0,
  },
});
const list = new Array(40).fill(0).map((i, index) => ({
  sex: index % 2,
  realName: `user${index}`,
  userId: index,
  userName: `userName${index}`,
  userStatus: index % 2,
  mobile: '1898988xx898',
}));
Mock.mock('/mock/query', 'post', (params) => {
  const data = JSON.parse(params.body);
  return {
    code: 200,
    data: {
      list: [...list].splice((data.pageNo - 1) * data.pageSize, data.pageSize),
      count: list.length,
    },
  };
});
Mock.mock('/mock/update', 'put', (params) => {
  const data = JSON.parse(params.body);
  for (const i of list) {
    if (i.userId === data.userId) {
      for (const k in data) {
        i[k] = data[k];
      }
    }
  }
  return {
    code: 200,
    data: true,
  };
});
Mock.mock('/mock/delete', 'delete', (params) => {
  let index;
  for (let i = 0; i < list.length; i += 1) {
    if (i.userId === params.userId) {
      index = i;
      break;
    }
  }
  list.splice(index, 1);
  return {
    code: 200,
    data: true,
  };
});

Mock.mock('/mock/post', 'post', (params) => {
  const data = JSON.parse(params.body);
  list.push({ userId: list[list.length - 1].userId + 1, ...data });
  return {
    code: 200,
    data: true,
  };
});
