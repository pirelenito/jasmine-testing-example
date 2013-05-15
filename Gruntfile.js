module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['src/**/*.js', 'spec/**/*.js', 'lib/**/*.js'],
        tasks: ['exec:jasmine']
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

    exec: {
      jasmine: {
        command: 'phantomjs run-jasmine.js SpecRunner.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');
};