module.exports = function(grunt){

	var path = require('path');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.config.set('copy', {
		html: {
			files: [
				// HTML TEMPLATE
				{
					expand: true,
					get cwd(){
						return path.join(grunt.config('BUILDER_DIR'), 'template/html');
					},
					src: ['**'],
					get dest(){
						return grunt.config('dest');
					}
				},
			]
		},
		assets: {
			files: [
				// ASSETS
				{
					get src(){
						return grunt.file.readJSON('package.json').assets;
					},

					get dest(){
						return grunt.config('dest')
					}
				}
			]
		}
	});

};