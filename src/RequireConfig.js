var require = {
  baseUrl: 'src',

  paths: {
    'spec': '../spec',

    'jquery': '../lib/jquery',
    'backbone': '../lib/backbone',
    'underscore': '../lib/underscore',

    'sinon': '../lib/sinon',
    'jasmine': '../lib/jasmine-1.3.1/jasmine',
    'jasmine-html': '../lib/jasmine-1.3.1/jasmine-html',
    'jasmine-jquery': '../lib/jasmine-jquery',
    'jasmine-sinon': '../lib/jasmine-sinon'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': ['jasmine'],
    'jasmine-jquery': ['jasmine'],
    'jasmine-sinon': ['jasmine']
  }
};