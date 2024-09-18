# vue-bootstrap后台脚手架
 用于快速构建后台管理系统页面
 在vue-cli4的基础上,增加了以下功能:
 1. ajax请求的封装/重试/取消/反馈
 2. 路由守卫
 3. 部分es10新特性的支持  如: nullish, 可选链
 4. 便捷的配置式表单
 5. 适合于后台管理系统的页面结构

 使用此脚手架构建的demo: [vue-bootstrap](https://www.darthvade.com/web/vue-bootstrap/dist)

# 项目介绍

## 目录结构
```
├── babel.config.js                         babel配置文件
├── package-lock.json                       第三方库描述文件
├── package.json                            第三方库描述文件以及项目描述文件
├── public                                  不参与打包的静态资源
├── src                                     源代码
│   ├── App.vue                             Vue根组件
│   ├── api                                 存放api调用方法的目录
│   ├── assets                              参与打包的静态资源
│   ├── components                          公用的vue组件
│   ├── directives                          全局的vue指令
│   ├── filters                             全局的vue过滤器
│   ├── main.js                             项目入口文件
│   ├── models                              状态管理目录
│   ├── router                              路由声明
│   ├── store.js                            状态管理入口
│   ├── utils                               重要的js工具目录
│   │   ├── axios.js                        网络请求基础设置
│   │   ├── feedback.js                     用于网络请求的反馈和加载提示
│   │   ├── map.js                          全局的数据映射关系
│   │   ├── mixins.js                       vue混入声明
│   │   ├── request.js                      网络请求方法
│   │   ├── utils.js                        其他js工具
│   │   └── validators.js                   表单验证规则
│   └── views                               路由视图,即页面
└── vue.config.js                           项目配置文件
```

## 功能介绍
1. 路由守卫
   当用户访问一个需要登录的路由时,路由自动重定向到登录页,登录完成后,会自动回到用户之前想要访问的页面;  
   要使用此功能,只需要在路由配置的meta中声明该路由需要授权: 

    ```js
    {
        path:'/list',
        component:list,
        meta:{
            auth:true,
            title:'数据列表'
        }
    }
    ```
 2. 页面结构
    页面框架结构为: 顶部的用户信息, 左侧的菜单栏, 以及右侧的内容区域,内容区域的顶部是面包屑  
    编写的路由组件一律存放在views目录下,并在router目录下声明路由,则此路由会自动渲染到内容区域内,无需更多操作  
    路由的配置项meta.title指定此路由的标题,meta.auth指定其是否需要登录才能访问
 3. 网络请求
    网络请求方法一律存放在 api目录下, 封装格式如 api/listTest.js内所示,
    exutor的函数签名:
```js
/**
 *
 * @param String method  请求方法
 * @param String url   请求url
 * @param Object data   请求参数
 * @param Object cancel  CancelTokenSource,用于取消此次请求
 * @param Boolean loading  是否loading
 * @param Boolean feedback   是否反馈
 * @param Object headers   headers
 * @param Number retry   重试次数
 * @param Number retryInterval   重试间隔 单位:ms
 * @returns 用Promise包裹的请求结果,如果请求失败,为null,如果请求成功但是该请求没有回传数据,则为true
 */
async function request({
  method,
  url,
  data = {},
  cancel = { token: null },
  loading = true,
  feedback = false,
  headers = {},
  retry = 1,
  retryInterval = 500,
}){  /*....*/ }
```
loading参数可以传入对象:  
```js
 { text:'加载中', lock:true //是否禁止用户点击 }
```
也可以传布尔值,传入false不展示loading, 传入true时只会展示loading图,无文字信息,也不会禁止用户点击

cancel参数用于取消此次请求, 每个组件都混入了一个this.cancelToken,在调用api时直接传入即可,
this.cancelToken会取消此组件内未完成的所有请求,如果要单独处理某个请求,也可以自己创建一个cancelToken来传入,并手动取消

feedback参数指示此次请求成功后是否向用户反馈服务器返回的信息(请求失败一定会反馈,不受此参数控制)

请求在遇到50x状态码时会重试(可以在utils/interceptors.js里修改),重试的次数和间隔时间可以通过retry和retryInterval控制

4. 声明式表单
   demo中的所有表单都是通过schema渲染的,使用方式如下:

```html
    <ulab-form size='small' layout='vertical' 
        :btnNames='["关闭","保存"]'
        :items='editFormConfigs' @submit='update' />
```
```js
import { sex, userStatus }  from '@map';
export default {
  data() {
    return {
      items: initFilterFormItems(),
    };
  },
  methods:{
      update(data){}
  }
}
function initFilterFormItems() {
  const items =  [
    {
      key: 'userName',
      type: 'el-input',
      label: '用户名',
      value: '',
    },
    {
      key: 'mobile',
      type: 'el-input',
      label: '手机',
      value: '',
    },
    {
      key: 'realName',
      type: 'el-input',
      label: '真实姓名',
      value: '',
    },
    {
      key: 'sex',
      type: 'checkbox-group',
      label: '性别',
      value: Object.keys(sex).map((i) => i - 0),
      options: { ...sex },
    },
    {
      key: 'userStatus',
      type: 'checkbox-group',
      label: '状态',
      value: Object.keys(userStatus).map((i) => i - 0),
      options: { ...userStatus },
    },
  ];
  return items;
}
```
以上代码会渲染一个具有五个字段的表单,其中三个输入框,两个多选框,点击表单的保存按钮时,可以在update方法里获取表单的值
表单项的配置参考如下:
```js
/**
 * =====================================================================
 * 参数items:
 * 对象数组,内含表单项的配置,包括组件类型,默认值,选项,占位符,校验规则等,例如:
 * [ {
 *    value:1,
 *    key:'gender',
 *    keyMin:'startTime',  // 如果是时间范围选择器,则需要传入keyMin和keyMax 分别表示开始和结束时间的字段名,此时会忽略key字段
 *    keyMax:'endTime',
 *    type:'form-select', //输入控件的类型,除了elment的基础类型以外,提供了几个自定义的类型,在 component/Input目录里
 *                        // checkbox radio select 这三个控件被封装成了 form-select  checkbox-group  radio-group, 以便使用
 *    label:'性别',
 *    options:[ { value:1, label:'男'}, { value:0, label:'女'} ],
 *       // options也可以使用对象格式: { 0:'温度', 1:'湿度', 10:'气压' }
 *       // 如果输入类型是选择器 单选  多选等具有选项的输入控件,则传入options渲染选项列表
 *    disabled:false, // 禁用此项
 *    hide:true  这个字段是否展示
 *
 *    如果type为el-date-picker,  可能需要提供以下属性:
 *    valueFormate:'timestamp', 指定输出值的格式
 *    format:'yyyy-MM-dd',       指定时间显示的格式
 *    pickerType:'date',        指定time-picker的具体类型
 *
 *    resetValue: 重置后的值,如果不提供,则重置为value的初始值,对于编辑来说,比较实用
 *    validator:Validator对象数组, 如果不提供,则默认不校验
 * } ]
 * =====================================================================
 */
```
5. gitlab-ci 自动集成
   此脚手架内包含一个简单的构建脚本,但是需要有gitlab环境支持才能实现自动构建功能
