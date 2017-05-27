module.exports = {
  entry: './js/index.js',
  output: {
    filename: './js/bundle.js',
  },
  node: {
    fs: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
