/* eslint-disable linebreak-style */
import path from 'node:path'

export default {
  mode: 'development',
  entry: {
    file: './src/js/file.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js'),
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
