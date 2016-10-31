const path = require('path')
const webpack = require('webpack')
const environment = process.env.NODE_ENV || 'development'
const isProd = environment !== 'development'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(environment)
    }
  })
]

if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }))
}

module.exports = {
  entry: ['babel-polyfill', 'whatwg-fetch', path.join(__dirname, 'src/app/index.js')],
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins
}
