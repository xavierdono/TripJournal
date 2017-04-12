module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-sinon'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/ionic/js/ionic-angular.js',

      'www/services/*.js',
      'test/services/*.js'
    ],
    preprocessors: {
      'www/services/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
