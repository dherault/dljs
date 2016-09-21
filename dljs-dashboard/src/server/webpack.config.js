const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, '../client');

module.exports = {
  devtool: '#cheap-eval-source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(clientPath, 'index.js'),
  ],
  output: {
    path: path.join(clientPath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: clientPath,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        // include: clientPath, // Don't: normalize.css dep needs it
      },
    ],
  },
};
