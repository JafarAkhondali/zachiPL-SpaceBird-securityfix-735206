module.exports = function(grunt){

	var path = require('path');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.config.set('uglify', {
		html: {
			files: [
				{
					get src(){
						return grunt.file.readJSON('package.json').files;
					},
					get dest(){
						return path.join(grunt.config('dest'), grunt.config('app-file'));
					}
				}
			],
			options: {
				get banner(){
					return grunt.file.read(
						path.join(
							grunt.config('BUILDER_DIR'),
							'template/app-banner-html.js'
						)
					)
				},
				get footer(){
					return grunt.file.read(
						path.join(
							grunt.config('BUILDER_DIR'),
							'template/app-footer-html.js'
						)
					)
				}
			}
		}
	});

};
