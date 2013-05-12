module.exports = function(grunt) {
  grunt.initConfig({
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

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');
};