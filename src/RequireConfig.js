var require = {
  baseUrl: 'src',
  paths: {
    'spec': '../spec',
    'lib': '../lib'
  },

  shim: {
    'lib/jquery': {
      exports: '$'
    },
    'lib/backbone': {
        deps: ['lib/underscore', 'lib/jquery'],
        exports: 'Backbone'
    },
    'lib/underscore': {
        exports: '_'
    },
    'lib/jasmine-1.3.1/jasmine': {
      exports: 'jasmine'
    },
    'lib/jasmine-1.3.1/jasmine-html': ['lib/jasmine-1.3.1/jasmine'],
    'lib/jasmine-jquery': ['lib/jasmine-1.3.1/jasmine'],
    'lib/jasmine-sinon': ['lib/jasmine-1.3.1/jasmine']
  }
};