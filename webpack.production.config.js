const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

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
    filename: '[name].bundle.js'
  },
  plugins: [
    definePlugin,
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } }, extractComments: false })],
    splitChunks: { chunks: 'all', name: 'vendor' }
  },
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, use: [{ loader: 'expose-loader', options: { exposes: ['PIXI'] } }] },
      { test: /phaser-split\.js$/, use: [{ loader: 'expose-loader', options: { exposes: ['Phaser'] } }] },
      { test: /p2\.js/, use: [{ loader: 'expose-loader', options: { exposes: ['p2'] } }] }
    ]
  },
  node: false,
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}
