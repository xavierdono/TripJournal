module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-sinon'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'www/services/*.js',
      'test/services/*.js'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}
