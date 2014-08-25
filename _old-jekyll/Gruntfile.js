// Generated on 2013-11-13 using generator-jekyllrb 0.4.1
'use strict';

// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      sass: {
        files: ['<%= yeoman.app %>/_scss/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '_config.yml',
          '!<%= yeoman.app %>/_bower_components'
        ],
        tasks: ['jekyll:server']
      },
      concat: {
        files: ['<%= yeoman.app %>/js/footer/*.js', '<%= yeoman.app %>/js/lib/*.js', '<%= yeoman.app %>/js/scripts/*.js', '<%= yeoman.app %>/js/pages/*.js'],
        tasks: ['concat']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '{.tmp,<%= yeoman.app %>}/css/**/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
        //hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= yeoman.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/**',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    sass: {
      server: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'app/css/screen.css': 'app/_scss/screen.scss',
          'app/css/pages/sketchbook-sessions.css': 'app/_scss/pages/sketchbook-sessions.scss'
        }
      }
    },
    concat: {
      options: {
        //separator: ';',
      },
      header: {
        src: [
          'app/js/scripts/fastclick.js',
          'app/js/scripts/skrollr.js',
          'app/js/scripts/share.js',
          'app/js/scripts/fitvids.js',
          'app/js/scripts/mousewheel.js'
        ],
        dest: 'app/js/scripts.js',
      },
      libraries: {
        src: [
          'app/js/lib/imagesloaded.js',
          'app/js/lib/reel.js',
          'app/js/lib/wallpaper.js',
          'app/js/lib/scrollbar.js',
          'app/js/lib/cycle2.js',
          'app/js/lib/cycle2.swipe.js'
        ],
        dest: 'app/js/lib.js',
      },
      case_studies: {
        src: [
          'app/js/footer/index.js',
          'app/js/pages/beercamp.js',
          'app/js/pages/rosetta.js',
          'app/js/footer/onload.js'
        ],
        dest: 'app/js/footer.js',
      },
    },
    uglify: {
      options: {
        mangle: false,
        compress: true
      },
      my_target: {
        files: {
          '<%= yeoman.dist %>/js/scripts.js': ['<%= yeoman.dist %>/js/scripts.js'],
          '<%= yeoman.dist %>/js/lib.js': ['<%= yeoman.dist %>/js/lib.js'],
          '<%= yeoman.dist %>/js/footer.js': ['<%= yeoman.dist %>/js/footer.js']
        }
      }
    },
    jekyll: {
      options: {
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files
            // Usemin moves CSS and javascript inside of Usemin blocks
            // Copy moves asset files and directories
            'img/**/*',
            'fonts/**/*',
            'js/*.js',
            'uploads/*',
            'js/ie/*.js',
            'css/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore
            '!**/_*{,/**}'
            // Explicitly add any files your site needs for distribution here
            //'_bower_components/jquery/jquery.js',
            //'favicon.ico',
            //'apple-touch*.png'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/js/**/*.js',
            '<%= yeoman.dist %>/css/**/*.css',
            '<%= yeoman.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= yeoman.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }
      }
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'sass',
      'concat',
      'jekyll:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'sass',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'copy:dist',
    'concat',
    'uglify'
    ]);

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
