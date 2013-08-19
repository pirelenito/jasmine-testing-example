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
          out: "build/src/boot.js"
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, src: ['src/RequireConfig.js'], dest: 'build'},
          {expand: true, src: ['lib/require.js'], dest: 'build'},
          {expand: true, src: ['css/*.css'], dest: 'build'},
          {expand: true, src: ['index.html'], dest: 'build'}
        ]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['src/**/*.js', 'spec/**/*.js']
    },

    exec: {
      clean: {
        command: 'rm -rf build'
      },
      jasmine: {
        command: 'phantomjs run-jasmine.js http://0.0.0.0:8000/SpecRunner.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('spec', ['jshint', 'connect', 'exec:jasmine']);
  grunt.registerTask('build', ['exec:clean', 'copy:build', 'requirejs']);
  grunt.registerTask('default', ['spec', 'build']);
};
