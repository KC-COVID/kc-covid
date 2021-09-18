const path = require('path');

module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ];
  // Can add below ['babel-plugin-webpack-alias', { config: path.resolve(__dirname, '../relativePath.config.js') }],
  const plugins = [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-jsx-source',
  ];
  return {
    presets,
    plugins,
  };
};
