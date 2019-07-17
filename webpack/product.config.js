const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const config = require('./base_config');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config_prod = {
  mode: 'production',
  output: {
    publicPath: config.QINIU_CDN_PATH, // local: '/'
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    splitChunks: {
     chunks: 'all',
     cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/
        },
        lib: {
          test: /[\\/]libs[\\/]/
        }
      }
    },
    runtimeChunk: "single",
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        loader: `url-loader?limit=100000&name=asset/[name]_[hash:5].[ext]&publicPath=${config.QINIU_CDN_PATH}`,
        test: /\.(woff|woff2|eot|ttf)$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: `url-loader?limit=10000&name=img/[hash].[ext]&name=asset/[name]_[hash:5].[ext]&publicPath=${config.QINIU_CDN_PATH}`,
        exclude: /node_modules/,
      },
      {
        test: /\.mp3$/,
        include: /src/,
        loader: 'file-loader'
      },
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'DEBUG': config.DEBUG,
      'DEV': false,
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(config.SRC_PATH, 'index.ejs'),
      favicon: path.resolve(config.ROOT_PATH, 'favicon.ico'),
      live2d: `<script src=${JSON.stringify(config.RUNTIME.host.live2d.host)}></script>`,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: false,
        removeEmptyAttributes: true,
      },
    }),
    new InlineManifestWebpackPlugin(),
  ]
}

function merge_prod(webpack_config) {
  return merge.smart(webpack_config, config_prod);
}

module.exports = merge_prod;