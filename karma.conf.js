module.exports = function (config) {
  config.set({

    basePath : '',

    // list of files / patterns to load in the browser
    frameworks: ['mocha', 'requirejs'],
    files : [
      {pattern: 'node_modules/chai/chai.js', included: false},
      {pattern: 'node_modules/lodash/lodash.js', included: false},
      {pattern: 'test/*test*.js', included: false},
      {pattern: 'venn*.js', included: false},

      'karma-require-conf.js'
    ],


    // list of files to exclude
    exclude : [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters : ['progress'],


    // web server port
    port : 9876,


    // cli runner port
    runnerPort : 9100,


    // enable / disable colors in the output (reporters and logs)
    colors : true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel : config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : true,


    // Start these browsers, currently available:
    browsers : ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout : 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : false

  });
};
