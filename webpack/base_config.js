const path = require('path');
const cfg = require('../config')();

module.exports = {
  ROOT_PATH: path.resolve(__dirname, '..'),
  SRC_PATH: path.resolve(__dirname, '../src'),
  BUILD_PATH: path.resolve(__dirname, '../build'),
  NODE_MODULES_PATH: path.resolve(__dirname, '../node_modules'),
  PUBLIC_PATH_ASSET:'/',
  QINIU_CDN_PATH: cfg.buildtime.cdn_path,
  RUNTIME: cfg.runtime,
  DEBUG: cfg.buildtime.debug,
  ANALYZE: cfg.buildtime.analyze,
  ENV: cfg.env,
  SOURCEMAP: cfg.buildtime.sourcemap,
  UGLIFY: cfg.buildtime.uglify,
  libraries: [
    'react',
    'react-dom',
    'redux',
    'classnames',
    'react-css-modules',
    'react-redux'
  ],
};