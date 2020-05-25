module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
    ],
  };
};
