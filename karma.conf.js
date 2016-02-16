var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    browsers: [
      'PhantomJS'
    ],
    coverageReporter: {
       reporters: [
         {
           type: 'html',
           subdir: 'html'
         },
         {
           type: 'lcov',
           subdir: 'lcov'
         }
       ]
    },
    files: [
      'test/index.js'
    ],
    frameworks: [
      'mocha'
    ],
    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'test/index.js': [
        'webpack',
        'sourcemap'
      ]
    },
    reporters: [
      'mocha',
      'coverage'
    ],
    singleRun: true,
    webpack: webpackConfig,
  });
};
