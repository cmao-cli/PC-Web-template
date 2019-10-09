const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const config = require('./base-config');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config_prod = {
  mode: 'production',
  output: {
    publicPath: config.CDN_PATH, // local: '/'
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    moduleIds: 'hashed',
    runtimeChunk: "single",
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
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true },
        },
        canPrint: true
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3 * 1024,
              name: 'asset/[name]_[hash:5].[ext]',
              publicPath: config.CDN_PATH,
            }
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3 * 1024,
              name: 'asset/[name]_[hash:5].[ext]',
              publicPath: config.CDN_PATH,
            }
          },
          {
            loader: 'image-webpack-loader', //图片压缩
          }
        ],
      },
      {
        test: /\.(mp3|mp4)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
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