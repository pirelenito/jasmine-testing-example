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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
};