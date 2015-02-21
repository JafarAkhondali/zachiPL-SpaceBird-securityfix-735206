module.exports = function(grunt){

	var path = require('path');

	// load groundskeeper task
	grunt.loadNpmTasks('grunt-groundskeeper');

	// default config for groundskeeper task
	grunt.config.set('groundskeeper', {
		dev: {
			get src(){
				return path.join(grunt.config('dest'), grunt.config('app-file'));
			},
			get dest(){
				return path.join(grunt.config('dest'), grunt.config('app-file'));
			},
			options: {
				console: true,
				get namespace(){
					return grunt.config('GROUNDSKEEPER_PHRASES');
				},
				replace: ';'
			}
		}
	});

};