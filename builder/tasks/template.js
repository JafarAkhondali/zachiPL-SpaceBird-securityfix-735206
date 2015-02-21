module.exports = function(grunt){

	var path = require('path');

	grunt.registerTask('template:html', function(){

		var source = path.join(grunt.config('BUILDER_DIR'), 'template/index.html'),
		    dest = path.join(grunt.config('dest'), 'index.html');

		grunt.file.write(dest, grunt.template.process(grunt.file.read(source)));
		grunt.log.writeln(dest + ' file saved');

	});

};
