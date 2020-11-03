## U-LAB后台管理系统
1. 此项目框架基于vue-cli命令行工具生成 参见[vue-cli](https://cli.vuejs.org/zh/guide/)
2. 此项目需要node.js环境.
3. 此项目使用了ES2015 - ES2020语言特性以及html5/css3特性,构建目标是现代桌面端浏览器[ie>=11]

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

## 项目运行与打包
1. 安装项目依赖: 
```bash
$ npm i 
```
2. 本地调试和预览:
```bash
$ npm run serve
```
3. 打包:
```bash
$ npm run build
```