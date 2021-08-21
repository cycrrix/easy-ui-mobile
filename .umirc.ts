import { defineConfig } from 'dumi';
import { join } from 'path';
import px2viewport from 'postcss-px-to-viewport';

export default defineConfig({
  title: 'easy-ui-mobile',
  favicon: '/easy-ui-mobile/assets/favicon.icon',
  logo: '/easy-ui-mobile/assets/logo.png',
  base: '/easy-ui-mobile',
  publicPath: '/easy-ui-mobile/',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'Github',
      path: 'https://github.com/cycrrix/easy-ui-mobile',
    },
  ],
  alias: {
    'easy-ui-mobile/lib': join(__dirname, 'src'), // 用来按需加载样式文件，demo中不写样式，就是使用了这个别名 babel-plugin-import
  },
  themeConfig: {
    hd: {
      // 设计稿375，1rem=16px
      rules: [{ mode: 'vw', options: [16, 375] }],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    },
  },
  extraBabelPlugins: [
    [
      'import',
      { libraryName: 'easy-ui-mobile', libraryDirectory: 'lib', style: true },
      'easy-ui-mobile',
    ],
  ],
  extraPostCSSPlugins: [
    px2viewport({
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
      unitPrecision: 2, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/node_modules/],
    }),
  ],
  // more config: https://d.umijs.org/config
});
