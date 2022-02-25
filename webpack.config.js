const path = require('path');

module.exports = {
  entry: './test/Element/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false
},
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000
  }
};
