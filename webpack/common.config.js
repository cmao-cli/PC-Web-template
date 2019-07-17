const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pxtorem = require('postcss-pxtorem');

const config = require('./base_config');
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
    globalObject: 'this'
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
          'style-loader',
          'css-loader?modules&localsConvention=[name]__[local]___[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer(),
                  pxtorem({
                    rootValue: 100,
                    propList: [
                      '*',
                      '!min-width',
                      '!border',
                      '!border-left',
                      '!border-right',
                      '!border-top',
                      '!border-bottom',
                    ],
                    selectorBlackList: [
                      'no_rem'
                    ],
                  }),
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
          'babel-loader?cacheDirectory=true',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
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
    new CleanWebpackPlugin(
      {
        root: config.ROOT_PATH, // An absolute path for the root.
        verbose: true, // Write logs to console.
        dry: false, // Use boolean 'true' to test/emulate delete. (will not remove files).
      }
    ),
    new webpack.DefinePlugin({
      'DEBUG': config.DEBUG,
      'DEV': is_dev
    })
  ],
};
if (config.ANALYZE) {
  config_common.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config_common;