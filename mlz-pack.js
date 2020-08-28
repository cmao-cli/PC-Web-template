/**
 * webpack配置文件
 * 具体详情请见：https://github.com/juicecube/mlz-pack
 */
const config = require('./config/index');
module.exports = {
  webpack: {
    analyzePlugin: false,
    htmlPlugin: {
      filename: 'index.html',
      favicon: 'favicon.ico',
      template: './src/index.ejs',
      front_config: `<script>window.CODEMAOCONFIG = ${JSON.stringify(config.runtime)}</script>`,
    },
    loaderOptions: [
    ],
  },
};
