const path = require('path');

module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');
  const presets = [
    '@babel/preset-env',
  ];
  return {
    presets
  };
};
