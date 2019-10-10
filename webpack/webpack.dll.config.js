const path = require('path');
const webpack = require('webpack');

const config = require('./config');

module.exports = {
  entry: {
    vender: [
      ...config.libraries,
    ],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll/[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ]
};
