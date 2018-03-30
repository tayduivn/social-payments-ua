const path = require('path');

module.exports = {
  entry: '../back-end/dist/bin/www.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './back-end/dist'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-loader' }]
      }
    ]
  }
};