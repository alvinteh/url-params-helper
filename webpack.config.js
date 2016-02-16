// Define required packages
var path = require('path');

var webpack = require('webpack');

// Define variables
var ENV_NAME = process.env.WEBPACK_ENV;
var PKG_NAME = 'url-params';
var DEV_SERVER_HOST = '0.0.0.0';
var DEV_SERVER_PORT = 8080;

// Define base configuration
var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: PKG_NAME + '.js',
    library: PKG_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx?)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx?)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: []
};

if (ENV_NAME === 'dev') {
  // Do nothing
}
else if (ENV_NAME === 'test-browser') {
  config.entry = 'mocha!./test/index.js';

  config.devServer = {
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT
  };

  config.output.filename = 'index.js';
  config.output.path = __dirname + '/tmp';
  config.output.publicPath = 'http://' + DEV_SERVER_HOST + ':' + DEV_SERVER_PORT + '/tmp';

  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

 config.resolve.root = path.resolve('./test');
}
else if (ENV_NAME === 'test-coverage') {
  config.entry = 'test/index.js';

  config.devtool = 'inline-source-map';

  //Remove ESLint
  config.module.loaders.pop();

  config.module.preLoaders = [
    {
      test: /\.jsx?$/,
      include: path.resolve(__dirname, './src'),
      exclude: /(node_modules|bower_components|test)/,
      loader: 'babel-istanbul',
      query: {
        cacheDirectory: true
      }
    }
  ];

}
else if (ENV_NAME === 'test') {
  // Do nothing
}
else if (ENV_NAME === 'dist') {
  config.output.filename = PKG_NAME + '.min.js';
  config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

// Export configuration
module.exports = config;
