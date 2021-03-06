// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/assets/bower_components/angular/angular.js',
      'app/assets/bower_components/angular-animate/angular-animate.js',
      'app/assets/bower_components/angular-loading-bar/build/loading-bar.js',
      'app/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/assets/bower_components/angular-route/angular-route.js',
      'app/assets/bower_components/angular-mocks/angular-mocks.js',
      'app/assets/bower_components/ngstorage/ngStorage.js',
      'app/assets/bower_components/angular-hamburger-toggle/dist/angular-hamburger-toggle.js',
      'app/assets/bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'app/assets/bower_components/lodash/lodash.js',
      'app/assets/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'app/assets/js/**/*.js',
      'app/assets/app/**/*.js',
      'unit-tests/specs/**/*.js'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    
    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    
    browserNoActivityTimeout: 100000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};