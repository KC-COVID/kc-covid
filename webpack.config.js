const path = require('path');
const relativePath = require('./relativePath.config');

// TODO: prod vs dev
module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      }, {
        test: /\.(png|svg|jpg|gif|otf|eot|ttf|svg|woff|woff2)$/,
        use: 'file-loader',
      },
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  ...relativePath,
};
