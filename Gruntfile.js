module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bootstrap: 'vendor/twbs/bootstrap',
        vendor: 'app/assets/js/vendor',
        app: 'app/assets/js/app',
        less: 'app/assets/less',
        templates: 'app/assets/js/templates',
        icons: 'app/assets/icons',

        jshint: {
            options: {
                expr: true,
                laxcomma: true,
            },

            all: ['<%= app %>/**/*.js'],
        },

        emberTemplates: {

            dist: {
                options: {
                    handlebarsPath: '<%= vendor %>/handlebars-v1.1.2.js',
                    templateBasePath: '<%= templates %>/',
                },

                files: {
                    '<%= templates %>/_': [ '<%= templates %>/**/*.hbs' ],
                },
            }
        },

        concat: {

            js: {
                src: [
                    '<%= vendor %>/jquery-2.0.3.js',
                    '<%= vendor %>/handlebars.runtime-v1.1.2.js',
                    '<%= vendor %>/ember-1.1.2.js',
                    '<%= vendor %>/underscore.js',
                    '<%= app %>/helpers.js',
                    '<%= templates %>/_',
                    '<%= app %>/app.js',

                    // Classes
                    '<%= app %>/classes/dossier.js',
                    '<%= app %>/classes/columns.js',
                    '<%= app %>/classes/stats.js',
                    '<%= app %>/classes/battle.js',
                    '<%= app %>/classes/tank.js',
                    '<%= app %>/classes/totals.js',
                    '<%= app %>/classes/tankBattles.js',
                    '<%= app %>/classes/formulas/base.js',
                    '<%= app %>/classes/formulas/wn7.js',
                    '<%= app %>/classes/filters/base.js',
                    '<%= app %>/classes/filters/battleType.js',

                    // Components
                    '<%= app %>/components/uploadButton.js',

                    // Pages
                    '<%= app %>/pages/index.js',
                    '<%= app %>/pages/dossier.js',
                ],

                dest: 'public/js/app.js',
            },

        },

        uglify: {
            dist: {
                src:  'public/js/app.js',
                dest: 'public/js/app.min.js',
            },
        },

        recess: {
            options: {
                compile: true,
                includePath: 'vendor/twbs/bootstrap/less',
            },

            bootstrap: {
                src: '<%= less %>/bootstrap/bootstrap.less',
                dest: 'public/css/bootstrap.css',
            },

            dist: {
                src: '<%= less %>/styles.less',
                dest: 'public/css/styles.css',
            }
        },

        cssmin: {
            minify: {
                files: {
                    'public/css/styles.min.css': [
                        'public/css/bootstrap.css',
                        'public/css/styles.css',
                        'app/assets/icons/vehicle.css',
                    ]
                }
            }
        },

        copy: {
            fonts: {
                expand: true,
                cwd: '<%= bootstrap %>/dist/fonts/',
                src: '*',
                dest: 'public/fonts/',
            },
        },

        clean: {
            templates: [ '<%= templates %>/_' ],
        },

        shell: {
            lang: {
                command: 'php artisan localize-js',
            },

            icons: {
                command: 'php artisan generate-icon-set -i <%= icons %>/vehicle.png <%= icons %>/vehicle --css icon-tank > <%= icons %>/vehicle.css',
            }
        },

        watch: {

            bootstrap: {
                files: '<%= less %>/bootstrap/*.less',
                tasks: ['recess:bootstrap', 'cssmin'],
            },

            less: {
                files: '<%= less %>/*.less',
                tasks: ['recess:dist', 'cssmin'],
            },

            js: {
                files: [
                    '<%= app %>/**/*.js',
                    '<%= templates %>/**/*.hbs',
                ],

                tasks: ['js-dev'],
            },

            lang: {
                files: ['app/lang/**/*.php'],
                tasks: ['shell:lang'],
            },

            reload: {
                files: [
                    'public/css/styles.min.css',
                    'public/js/*.js',
                    'app/views/**/*.php',
                ],

                options: { livereload: true },
            }
        },
    });

    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('js-dev', ['jshint', 'emberTemplates', 'concat:js', 'clean:templates']);

    grunt.registerTask('js', ['js-dev', 'uglify']);
    grunt.registerTask('css', ['recess', 'cssmin']);
    
    // Default task(s).
    grunt.registerTask('default', ['shell:icons', 'css', 'js', 'copy:fonts', 'shell:lang']);

    grunt.registerTask('update', ['css', 'js', 'shell:lang']);
};