/* eslint-disable linebreak-style */
const path = require('node:path')

module.exports = {
  mode: 'development',
  entry: {
    app: './public/js/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
