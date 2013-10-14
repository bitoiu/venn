module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    gitcommit: {
        options: {
          message : "Commit venn.min.js files",
          ignoreEmpty : "true"
        },
        files: {
          files: {
            src: ['venn.min.js']
          }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-git');

  // Default task(s).
  grunt.registerTask('default', ['uglify'])
  grunt.registerTask('shipit', ['uglify','gitcommit','release']);

};