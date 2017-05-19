const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'webpack-bundle.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx?$)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
  "presets": [
    "react",
    [ "es2015", { "modules": false } ]
  ]
}
      },
      {
        test: /scss$/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader', 'sass-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    publicPath: '/build',
    hot: true
},
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

}
