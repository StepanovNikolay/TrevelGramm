const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: {
    index: "./src/assets/scripts/index.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
};

module.exports = config;