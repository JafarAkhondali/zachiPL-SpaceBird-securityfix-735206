module.exports = function(grunt){

	var path = require('path');

	grunt.registerTask('help', function(){
		grunt.log.writeln(
			grunt.config.process(
				grunt.file.read(
					path.join(
						grunt.config('BUILDER_DIR'),
						'template/help.tmp'
					)
				)
			)
		);
	});

};
