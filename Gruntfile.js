module.exports = function(grunt){

	grunt.loadTasks('builder/tasks');

	grunt.registerTask('build:html', [
		'keywords',
		'concat:html',
		'copy:html',
		'copy:assets',
		'engine',
		'template:html'
	]);

	grunt.registerTask('release:html', [
		'keywords',
		'uglify:html',
		'groundskeeper',
		'copy:html',
		'copy:assets',
		'engine',
		'template:html'
	]);

	grunt.registerTask('html', ['release:html']);
	grunt.registerTask('release', ['release:html']);
	grunt.registerTask('default', ['help']);

};
