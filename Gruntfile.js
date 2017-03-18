/**
 *Minimize del frontend
 * 1) connect
 * 2) open
 * 3) sass
 * 4) copy
 * 5) uglify
 * 6) concat
 * 7) remove
 * 8) string-replace
 * 9) usebanner
 * 10) watch
 */
module.exports = function (grunt) {
    var modRewrite = require('connect-modrewrite');
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 8888,
                    base: "dist",
                    livereload: true,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        var html5mode = modRewrite(['^[^\\.]*$ /index.html [L]']);
                        var marray = [proxy, html5mode];
                        return marray.concat(defaultMiddleware);
                    }
                },
                proxies: []
            }
        },
        open: {
            all: {
                path: 'http://localhost:8888'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: false
                },
                files: {
                    'dist/css/main.css': 'src/scss/_ksass.scss'
                }
            }
        },
        copy: {
            main: {
                files: [{
                    cwd: 'src/fonts',
                    src: '**/*',
                    dest: 'dist/fonts',
                    expand: true
               }, {
                    cwd: 'src/vendors/bootstrap-sass/assets/fonts',
                    src: '**/*',
                    dest: 'dist/fonts',
                    expand: true
               }, {
                    cwd: 'src/vendors/fontawesome/fonts',
                    src: '**/*',
                    dest: 'dist/fonts',
                    expand: true
               }, {
                    cwd: 'src/images',
                    src: '**/*',
                    dest: 'dist/images',
                    expand: true
               }, {
                    cwd: 'src/',
                    src: '*.html',
                    dest: 'dist/',
                    expand: true
               }, {
                    cwd: 'src/partials',
                    src: '**/*.html',
                    dest: 'dist/partials',
                    expand: true
               }, {
                    cwd: 'src/js/directives',
                    src: '**/*.html',
                    dest: 'dist/partials/directives',
                    expand: true
               }, {
                    cwd: 'src/data',
                    src: '**/*.json',
                    dest: 'dist/data',
                    expand: true
               }]
            }
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'dist/libs',
                    src: '**/*js',
                    dest: 'dist/libs',
                    ext: '.js',
                    extDot: 'last'
            }]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            libs: {
                src: [
                'src/vendors/jquery/dist/jquery.min.js',
                "src/vendors/jquery-ui/jquery-ui.js",
                'src/vendors/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                'src/vendors/angular/angular.min.js',
                'src/vendors/angular-route/angular-route.min.js',
                "src/vendors/angular-aria/angular-aria.js",
                // librerias utilitarias para generar gráficos
                "src/vendors/highcharts/highstock.js",
                //app.js
                'src/js/common/**/*.js',
                'src/js/app.js',
                //services
                'src/js/services/**/*.js',
                //directives
                'src/js/directives/**/*.js',
                //controllers
                'src/js/controllers/**/*.js'
                ],
                dest: 'dist/libs/app.min.js'
            }
        },
        remove: {
            default_options: {
                trace: true,
                dirList: ['dist/js']
            }
        },
        'string-replace': {
            inline: {
                files: {
                    'dist/': ['dist/**/*.html', 'dist/libs/*.js', 'dist/css/*.css'],
                },
                options: {
                    replacements: [{
                        pattern: /{{VERSION}}/g,
                        replacement: '<%= pkg.version %>&t=<%=grunt.template.today("yyyymmdd")%>'
                    }]
                }
            }
        },
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '/*!\n' +
                        '  * <%= pkg.name %> : <%= pkg.description %>\n' +
                        '  * @version <%= pkg.version %>\n' +
                        '  * @author <%= pkg.author %>\n' +
                        '  * @date <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '  */\n',
                    linebreak: true
                },
                files: {
                    src: ['dist/**/*.js']
                }
            }
        },

        watch: {
            img: {
                options: {
                    livereload: true
                },
                files: ['src/images/**/*',
                        'src/**/*.png',
                        'src/**/*.jpg',
                        'src/**/*.gif',
                        'src/**/*.eot',
                        'src/**/*.svg',
                        'src/**/*.ico',
                        'src/**/*.ttf',
                        'src/**/*.woff',
                        'src/**/*.woff2'
                    ],
                tasks: ['copy', 'string-replace', 'nginclude', 'htmlmin']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['src/*.html', 'src/**/*.html'],
                tasks: ['copy', 'string-replace', 'nginclude', 'htmlmin']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.js'],
                tasks: ['concat', 'string-replace']
            },
            sass: {
                options: {
                    livereload: true
                },
                files: ['src/**/*.scss'],
                tasks: ['copy', 'string-replace', 'nginclude', 'htmlmin', 'sass']
            }
        },

        nginclude: {
            options: {
                discardReferencedFiles: false,
                parserOptions: {
                    decodeEntities: false
                },
            },
            targets: {
                files: [{
                    cwd: 'dist/',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    //removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },
    });

    grunt.registerTask('default', ["copy", 'sass', 'concat', 'uglify', 'remove', 'usebanner', 'string-replace', 'nginclude', 'htmlmin']);
    grunt.registerTask('build', ['default']);
    grunt.registerTask('serve', ["copy", 'sass', 'concat', 'remove', 'string-replace', 'nginclude', 'htmlmin', 'configureProxies:server', "open", 'connect:server', 'watch']);
};
