const webpack = require('webpack')
const path = require('path')
const hwp = require('html-webpack-plugin')

module.exports = {
  entry: './src/routes/',
  devServer: {
    historyApiFallback: true,
    port: 13370
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
        include: __dirname + '/src'
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [new hwp({ template: path.join(__dirname, '/src/index.html') })]
}
