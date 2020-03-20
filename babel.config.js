const path = require('path');
module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ];
  const plugins = [
    '@babel/transform-runtime',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-jsx-source',
    '@babel/plugin-transform-regenerator',
    ['babel-plugin-webpack-alias', {
      config: path.resolve(__dirname, './relativePath.config.js')
    }],
  ];
  return {
    presets,
    plugins,
  };
};
