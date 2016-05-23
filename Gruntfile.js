//https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt

module.exports = function (grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in controllers and services
      build: ['Gruntfile.js', 'controllers/**/*.js', 'services/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/bmbase.min.js': ['controllers/**/*.js','services/**/*.js']
        }
      }
    },
    watch: {
      // for stylesheets, watch css and less files 
      // only run less and cssmin stylesheets: { 
      // files: ['src//*.css', 'src//*.less'], 
      // tasks: ['less', 'cssmin'] },

      // for scripts, run jshint and uglify 
      scripts: { 
        files: ['controllers/**/*.js','services/**/*.js'], 
        tasks: ['uglify','jshint'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'jshint']);//, 'cssmin', 'less']); 
  
};