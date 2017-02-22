module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false
                }
            }
        },

		sass: {
			options: {
				sourceMap: false, // No source maps (Might regret this)
			},
			dist: {
				files: [{
					expand: true,
					cwd: "src/scss",
					src: ["*.scss"],
					dest: "dist/css",
					ext: ".min.css"
				}]
			}
		},

		postcss: {
			options: {
				map: false, // No source maps (Might regret this)
				processors: [
					require('pixrem')(), // Fallbacks for rem units
					require('autoprefixer')({ browsers: ['last 2 versions', 'ie 9'] }), // Vendor prefixes
					require('cssnano')() // Minification
				]
			},
			dist: {
				src: "dist/css/*.css"
			}
  		}
	});

	grunt.registerTask('dev', ['watch']); // Development Task
    grunt.registerTask('prod', ['sass', 'postcss']); // Production Task
};
