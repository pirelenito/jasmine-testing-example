module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      uses_defaults: {}
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'spec/**/*.js', 'lib/**/*.js'],
        tasks: ['spec']
      }
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'src/RequireConfig.js',
          baseUrl: "src",
          name: "Boot",
          out: "build/boot.js"
        }
      }
    },

    jshint: {
      all: ['src/**/*.js', 'spec/**/*.js']
    },

    exec: {
      jasmine: {
        command: 'phantomjs run-jasmine.js http://0.0.0.0:8000/SpecRunner.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('spec', ['connect', 'exec:jasmine']);
  grunt.registerTask('default', ['jshint', 'spec', 'requirejs']);
};