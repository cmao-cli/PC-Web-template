const config_common = require('./webpack/common.config');
let webpack_config = config_common;

if (process.env.NODE_ENV !== 'local') {
  const merge_prod = require('./webpack/product.config.js');
  webpack_config = merge_prod(webpack_config);
} else {
  const merge_dev = require('./webpack/dev.config.js');
  webpack_config = merge_dev(webpack_config);
}
module.exports = webpack_config;