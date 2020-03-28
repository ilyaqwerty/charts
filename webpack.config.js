const Dotenv = require('dotenv-webpack');
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const getPath = pathToFile => path.resolve(__dirname, pathToFile)
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: getPath('dist'),
    filename: isDev ? '[name].js' : '[name].[hash].js',
  },
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new Dotenv(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public/*.ico',
        to: '[name].ico'
      },
      {
        from: 'public/*',
        test: /.(js|json)$/,
        to: '[name].[ext]'
      }
    ])
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: isProd,
    minimizer: [
      new TerserWebpackPlugin({
        exclude: ['./node_modules'],
        sourceMap: isDev,
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
          // 'eslint-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg)/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2)/,
        use: ['file-loader']
      }
    ],
  },
}