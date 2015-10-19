module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            site_build_js: {
                options: {
                    beautify: true,
                    preserveComments: false

                },
                files: {
                    './app/assets/javascripts/build.min.js': [
                        './resources/bower_components/jquery/dist/jquery.js',
                        './resources/bower_components/jquery-ui/jquery-ui.js',
                        './resources/bower_components/bootstrap/dist/js/bootstrap.js',
                        './resources/bower_components/PACE/pace.js',
                        './resources/javascripts/custom.js',
                        './resources/bower_components/select2/dist/js/select2.js',
                        './resources/javascripts/jqBootstrapValidation-1.3.7-customized.js',
                        './resources/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
                        './resources/bower_components/ckeditor/adapters/jquery.js'
                    ]
                }
            },
            build_lt_ie_9_js: {
                options: {
                    beautify: false
                },
                files: {
                    './app/assets/javascripts/build_lt_ie_9_js.min.js': [
                        './resources/bower_components/respond/dest/respond.src.js',
                        './resources/bower_components/html5shiv/dist/html5shiv.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    './app/assets/javascripts/build.min.js',
                    './resources/bower_components/ckeditor/ckeditor.js'
                ],
                dest: './app/assets/javascripts/build.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './app/assets/stylesheets/build.min.css': [
                        './resources/bower_components/bootstrap/dist/css/bootstrap.css',
                        './resources/bower_components/jquery-ui/themes/smoothness/jquery-ui.css',
                        './resources/bower_components/components-font-awesome/css/font-awesome.css',
                        './resources/bower_components/select2/dist/css/select2.css',
                        './resources/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css',

                        './resources/stylesheets/style.default.css',
                        './resources/stylesheets/custom.css'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['./resources/bower_components/components-font-awesome/fonts/*',
                            './resources/bower_components/bootstrap/fonts/*'],
                        dest: './app/assets/fonts/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: ['./resources/tmp']
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'copy', 'clean']);
};
