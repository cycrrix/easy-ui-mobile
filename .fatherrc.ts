export default {
  cjs: { type: 'babel', lazy: true },
  esm: { type: 'babel' },
  runtimeHelpers: true,
  extraBabelPlugins: [
    // 移动端不使用antd，看后续antd mobile
    // [
    //   'babel-plugin-import',
    //   {
    //     libraryName: 'antd',
    //     libraryDirectory: 'es',
    //     style: true,
    //   },
    // ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          '@/_hooks': './src/_hooks',
        },
      },
    ],
  ],
};
