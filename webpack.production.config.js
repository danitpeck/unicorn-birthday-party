const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
})

module.exports = {
  entry: {
    app: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      path.resolve(__dirname, 'src/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: './js/',
    filename: '[name].[contenthash].bundle.js',
    clean: true
  },
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      filename: path.resolve(__dirname, 'index.html'),
      scriptLoading: 'defer',
      minify: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } }, extractComments: false })],
    splitChunks: { chunks: 'all', name: 'vendor' }
  },
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') }
    ]
  }
}
