exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'specs/**/*.js'
  ],
  
  multiCapabilities: [{
    browserName: 'chrome'
  }],

  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 2500000
  }
};