const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/bin/www.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  plugins: [
    // mongoose hack
    new webpack.DefinePlugin({
      'typeof window': '"object"'
    })
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  }
};