---
order: 2
title: '搭建过程'
nav:
  title: 开发指南
---

# easy-ui-mobile

- 采用[dumi](https://d.umijs.org/zh-CN)+[father](https://github.com/umijs/father)+[gulp](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)进行组件库的文档搭建以及打包

## 搭建过程

```js
$ npx @umijs/create-dumi-lib --site # 初始化一个站点模式的组件库开发脚手架
# or
$ yarn create @umijs/dumi-lib --site
```

额外需要安装的依赖

```js
// 添加了yarn.lock文件，一步到位
yarn

// 分开安装各个子包
yarn add classnames @babel/runtime
yarn add babel-plugin-import rimraf --dev
yarn add @types/classnames @types/react @types/react-dom
```

解释：

> babel-plugin-import：按需引入 antd，以及我们自己的组件库
>
> @babel/runtime： 根据 father 的要求，建议安装，看.fatherrc.js
>
> 以及安装各种声明

接下来就是修改配置

.umirc.ts 以及.fatherrc.js 中的配置，详见项目

## 搭建过程遇到问题

1、发布 npm，详见https://www.npmjs.com/package/easy-ui-mobile

2、部署 github.io

- 部署到 github.io 时注意事项，详见[dumi](https://d.umijs.org/zh-CN/guide/faq)的 FAQ

- 部署后的地址：https://cycrrix.github.io/easy-ui-mobile

3、npm run build 报错: ts 类型声明重复

- 原因：package.json 缺省配置中未指明@type/react 与@types/react-dom 版本，导致最终 node_modules 目录中@type/react 为 v17（部分包依赖@type/react 版本为\*，会匹配任意版本，这里直接匹配到最新版本 v17 了），@types/react-dom 为 v16(@umijs/renderer-mpa 依赖这 2 个包的版本均为 v16)，所以@types/react-dom 包里面又会有 node_modules 依赖 v16 的@type/react.
- 解决方案：package.json 中明确@type/react 与@types/react-dom 的版本为 v17

4、`dumi build` 后生成的 `umi.css` 未包含写的样式内容

- 起因：参照`antd`搭建目录结构，包括样式的按需引入。同时在`package.json`里声明`sideEffects`字段,只声明了 less 文件，导致`dumi build`时未导入相关样式，但是`dumi dev`本地运营时是没有问题的。应该是本地开发会不读取 sideEffects 字段

```json
  "sideEffects": [
    "*.less"
  ],
```

- 解决方案：因参照 antd 的样式按需导入，使用了`babel-plugin-import`

```js
// 转换栗子
import { Drawer } from 'easy-ui-mobile';
ReactDOM.render(<Drawer>xxxx</Drawer>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _drawer = require('easy-ui-mobile/lib/drawer');
// 注意这行代码，因为只是单纯的导入style目录下的index.ts文件，并且标识了sideEffects。
// 本地打包会根据alias解析到src目录，所以要配置src目录下的部分文件有副作用，否则该文件不会被打包进来
require('easy-ui-mobile/lib/drawer/style');
ReactDOM.render(<_drawer>xxxx</_drawer>);
```

sideEffects 完整配置

```json
  "sideEffects": [
    "src/**/style/*",
    "es/**/style/*",
    "lib/**/style/*",
    "*.less"
  ],
```
