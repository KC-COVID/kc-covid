const path = require('path');

// Here we can setup relative paths, webpack will turn these into the full paths
// Really just saves us some effort
// ATM doesn't do anything, just an example
const config = {
  resolve: {
    alias: {
      common: path.join(path.resolve(__dirname, './src/components/common')),
      'more-than-one-word-path': path.join(path.resolve(__dirname, './src/components/long-path-name')),
    },
  },
};

module.exports = config;
