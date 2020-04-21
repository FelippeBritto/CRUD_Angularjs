/*jslint node: true */
"use strict";


module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),


      uglify: {
         dist: {
            files: {
               'dist/app.js': ['dist/app.js']
            },
            options: {
               mangle: false
            }
         }
      },

      html2js: {
         dist: {
            src: ['app/templates/*.html'],
            dest: 'tmp/templates.js'
         }
      },

      clean: {
         temp: {
            src: ['tmp']
         }
      },

      concat: {
         options: {
            separator: ';'
         },
         dist: {
            src: ['app/*.js', 'tmp/*.js'],
            dest: 'dist/app.js'
         }
      },

      jshint: {
         options: {
            jshintrc: '.jshintrc'
         },
         all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
      },

      connect: {
         server: {
            options: {
               hostname: 'localhost',
               port: 8081
            }
         }
      },

      watch: {
         dev: {
            files: ['Gruntfile.js', 'app/*.js', '*.html'],
            tasks: ['jshint', 'html2js:dist', 'concat:dist', 'clean:temp'],
            options: {
               atBegin: true
            }
         },
         min: {
            files: ['Gruntfile.js', 'app/*.js', '*.html'],
            tasks: ['jshint', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
            options: {
               atBegin: true
            }
         }
      },

      compress: {
         dist: {
            options: {
               archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
            },
            files: [{
               src: ['index.html'],
               dest: '/'
            }, {
               src: ['dist/**'],
               dest: 'dist/'
            }, {
               src: ['assets/**'],
               dest: 'assets/'
            }, {
               src: ['libs/**'],
               dest: 'libs/'
            }]
         }
      }


   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-connect');
   grunt.loadNpmTasks('grunt-contrib-compress');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-html2js');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('default', ['connect:server', 'watch:min']);
   grunt.registerTask('package', ['jshint', 'html2js:dist', 'concat:dist', 'uglify:dist',
      'clean:temp', 'compress:dist'
   ]);
};