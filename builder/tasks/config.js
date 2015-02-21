module.exports = function(grunt){

	var path = require('path');

	// set constants
	grunt.config('DEFAULT_ENGINE', 'solpeo-engine.js');
	grunt.config('DEFAULT_NO_CACHE', false);
	grunt.config('ENGINE_CDN', 'http://cdn.solpeo.com/engine/solpeo_engine-<%=engine%>.min.js');
	grunt.config('BUILDER_DIR', 'builder');
	grunt.config('CACHE_DIR', path.join(grunt.config('BUILDER_DIR'), 'cache'));
	grunt.config('ILLEGAL_KEYWORDS', ['as', 'char', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']);
	grunt.config('GROUNDSKEEPER_PHRASES', ['Engine.log', 'expect']);

	// app name used in file name
	grunt.config('app-file', '<%=name%>-<%=version%>.js');
	grunt.config('engine-file', 'solpeo_engine.js');

	// merge package.json into configuration object
	grunt.config.merge(grunt.file.readJSON('package.json'));

	// merge flags into configuration object
	grunt.config('dest', grunt.option('dest') || grunt.config('dest') || 'build/');
	grunt.config('engine', grunt.option('engine') || grunt.config('engine') || grunt.config('DEFAULT_ENGINE'));

	if (~grunt.option.flags().indexOf('no-cache'))
		grunt.config('no-cache', !!grunt.option('no-cache'))
	else if (grunt.config('no-cache') === undefined)
		grunt.config('no-cache', grunt.config('DEFAULT_NO_CACHE'));

};
