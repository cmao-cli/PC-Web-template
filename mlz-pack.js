const path = require('path');
const config = require('./config')
console.log(config);

module.exports = {
  // "baseUrl": __dirname,
  "entry": [path.join(__dirname, './src/index.tsx')],
  html:{
    filename: 'index.html',
    template: path.resolve(__dirname, './src/index.ejs'),
    favicon: path.resolve(__dirname, './favicon.ico'),
    // 这个配置也是需要外部传入的，所以这个config
    // front_config: `<script>window.CODEMAOCONFIG = ${JSON.stringify(config.RUNTIME)}</script>`,
  },
  // alias: {
  //   src: path.join(__dirname, 'src'),
  // },
  // globalVariable: {
  //   Debug: false
  // },
  // analyze: false,
  // port: 5000,
}