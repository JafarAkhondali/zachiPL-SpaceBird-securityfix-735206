module.exports = function(grunt){

	var path = require('path');

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.config.set('clean', {
		app: {
			get src(){
				return path.join(grunt.config('dest'), grunt.config('app-file'));
			}
		},
		assets: {
			files: [
				{
					expand: true,
					get cwd(){
						return grunt.config('dest')
					},
					get src(){
						return grunt.config('assets');
					}
				}
			]
		},
		cache: {
			get src(){
				return grunt.config('CACHE_DIR');
			}
		},
		build: {
			get src(){
				return grunt.config('dest');
			}
		}
	});

};