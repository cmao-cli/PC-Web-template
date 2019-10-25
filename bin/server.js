const express = require('express');
const app = express();
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config/index.js');
const webpackConfig = require("../webpack.config.js");
const _config = config();
const IP = _config.buildtime.origin_server.ip;
const PORT = _config.buildtime.origin_server.port;

compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: {
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
  },
  open: true
});
devServer.listen(PORT, IP, err => {
  if (err) {
    return console.log(err);
  }
  console.log(('Starting the development server...\n'));
  // if (isInteractive) {
  //   clearConsole();
  // }
  // console.log(chalk.cyan('Starting the development server...\n'));
  // openBrowser(urls.localUrlForBrowser);
});

// const webpackDevServer = require("webpack-dev-middleware")(compiler, {
//   noInfo: false,
//   publicPath: webpackConfig.output.publicPath,
//   hot: true
// });
// app.use(historyApiFallback({ verbose: false }));
// app.use(webpackDevServer);
// app.use(require("webpack-hot-middleware")(compiler));

// app.listen(PORT, IP, function() {
//   console.log('listening on ' + IP + ' : ' + PORT);
// });