const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./base-config');
let is_dev = process.env.NODE_ENV !== 'production';

// Configs
const config_common = {
  entry: {
    index: [ path.resolve(config.SRC_PATH, './index.tsx') ],
  },
  output: {
    // 打包输出的文件
    path: config.BUILD_PATH,
    publicPath: '/',
    // globalObject: 'this'
  },
  resolve: {
    modules: [
      config.ROOT_PATH,
      'node_modules'
    ],
    alias: {
     "root": config.ROOT_PATH,
     "src": config.SRC_PATH
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    symlinks: false,
    cacheWithContext: false
  },
  externals: {
    'CONFIG': is_dev ? `'${JSON.stringify(config.RUNTIME)}'` : {},
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        include: [
          path.resolve(config.ROOT_PATH, 'src')
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: is_dev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[name]__[hash:5]"
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer(),
                ];
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          'babel-loader',
        ],
        include: path.resolve(config.ROOT_PATH, 'src'),
        exclude: /(node_modules)/,
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            name: '[name].js',
            inline: true,
          },
        },
        exclude: /(node_modules)/
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: is_dev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: is_dev ? '[id].css' : '[id].[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin({
      root: config.ROOT_PATH, // An absolute path for the root.
      verbose: true, // Write logs to console.
      dry: false, // Use boolean 'true' to test/emulate delete. (will not remove files).
    }),
    new webpack.DefinePlugin({
      'DEBUG': config.DEBUG,
    })
  ],
};
if (config.ANALYZE) {
  config_common.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config_common;