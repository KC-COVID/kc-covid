const path = require('path');

// TODO: prod vs dev
// TODO: Add back in relative path
module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(scss|css)$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.md$/,
      use: 'raw-loader',
    }, {
      test: /\.(html|png|svg|jpg|gif|otf|eot|ttf|svg|woff|woff2)$/,
      use: 'file-loader',
    },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.json'] },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
  },
};
