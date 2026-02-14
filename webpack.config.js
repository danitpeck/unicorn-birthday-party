const path = require('path')
const webpack = require('webpack')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
  entry: {
    app: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      path.resolve(__dirname, 'src/main.js')
    ]
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'js'),
    publicPath: './js/',
    filename: '[name].bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '.')
    },
    port: 3000,
    open: true,
    hot: true,
    liveReload: true
  },
  plugins: [
    definePlugin
  ],
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
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  }
}
