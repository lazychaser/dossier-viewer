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
                sub: true,
            },

            all: ['public/js/app.js'],
        },

        emberTemplates: {
            options: {
                handlebarsPath: '<%= vendor %>/handlebars-v1.1.2.js',
            },

            common: {
                options: {
                    templateBasePath: '<%= templates %>/common/',
                },

                files: {
                    'public/js/templates.js': [ '<%= templates %>/common/**/*.hbs' ],
                },
            },

            ru: {
                options: {
                    templateBasePath: '<%= templates %>/ru/',
                },

                files: {
                    'public/js/templates-ru.js': [ '<%= templates %>/ru/**/*.hbs' ],
                },
            }
        },

        concat: {

            vendor: {
                src: [
                    '<%= vendor %>/jquery-2.0.3.js',
                    '<%= vendor %>/handlebars.runtime-v1.1.2.js',
                    '<%= vendor %>/ember-1.2.0.js',
                ],

                dest: 'public/js/vendor.js',
            },

            js: {
                options: {
                    banner: '(function (Ember, undefined) { "use strict";\n',
                    footer: '})(Ember);',
                },

                src: [
                    '<%= app %>/helpers.js',
                    '<%= app %>/app.js',

                    // Classes
                    '<%= app %>/classes/dossier.js',
                    '<%= app %>/classes/columns.js',
                    '<%= app %>/classes/stats.js',
                    '<%= app %>/classes/battle.js',
                    '<%= app %>/classes/tank.js',
                    '<%= app %>/classes/tankBattles.js',
                    '<%= app %>/classes/aggregated/dossier.js',
                    '<%= app %>/classes/aggregated/item.js',
                    '<%= app %>/classes/formulas/base.js',
                    '<%= app %>/classes/formulas/wn7.js',
                    '<%= app %>/classes/formulas/eff.js',
                    '<%= app %>/classes/formulas/wot.js',
                    '<%= app %>/classes/filters/base.js',
                    '<%= app %>/classes/filters/battleType.js',
                    '<%= app %>/classes/favs.js',

                    // Components
                    '<%= app %>/components/uploadButton.js',

                    // Views
                    '<%= app %>/views/alert.js',
                    '<%= app %>/views/dossierTable.js',
                    '<%= app %>/views/favs.js',
                    '<%= app %>/views/inputs.js',

                    // Pages
                    '<%= app %>/pages/index.js',
                    '<%= app %>/pages/dossier.js',
                    '<%= app %>/pages/compare.js',
                ],

                dest: 'public/js/app.js',
            },

        },

        uglify: {
            all: {
                expand: true,
                cwd:  'public/js',
                src:  ['*.js', '!*.min.js'],
                dest: 'public/js/',
                ext:  '.min.js',
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

            emberTemplates: {
                files: '<%= templates %>/**/*.hbs',
                tasks: ['emberTemplates'],
            },

            js: {
                files: '<%= app %>/**/*.js',
                tasks: ['app'],
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
    // grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('js-vendor', ['concat:vendor']);
    grunt.registerTask('app', ['concat:js', 'jshint']);

    grunt.registerTask('js', ['js-vendor', 'emberTemplates', 'app', 'shell:lang', 'uglify']);
    grunt.registerTask('css', ['recess', 'cssmin']);
    
    // Default task(s).
    grunt.registerTask('default', ['css', 'js']);
    grunt.registerTask('install', ['shell:icons', 'copy:fonts', 'default']);

};