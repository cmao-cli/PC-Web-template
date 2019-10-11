const path = require('path');
const cfg = require('../config')();

let is_dev = process.env.NODE_ENV !== 'production';
module.exports = {
  IS_DEV: is_dev,
  ROOT_PATH: path.resolve(__dirname, '..'),
  SRC_PATH: path.resolve(__dirname, '../src'),
  BUILD_PATH: path.resolve(__dirname, '../build'),
  NODE_MODULES_PATH: path.resolve(__dirname, '../node_modules'),
  PUBLIC_PATH_ASSET:'/',
  CDN_PATH: cfg.buildtime.cdn_path,
  RUNTIME: cfg.runtime,
  DEBUG: cfg.buildtime.debug,
  ANALYZE: cfg.buildtime.analyze,
  ENV: cfg.env,
  SOURCEMAP: cfg.buildtime.sourcemap,
  UGLIFY: cfg.buildtime.uglify,
  CSS_SCOPED_NAME: is_dev ? '[name]__[local]' : '[name]__[hash:5]',
  libs: {
    vender: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-dom',
    ],
    cmaoVender: [
      '@cmao',
    ],
  },
  libraries: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-dom',
  ],
};