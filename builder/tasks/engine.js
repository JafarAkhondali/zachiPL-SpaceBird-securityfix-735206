module.exports = function(grunt){

	var VERSION_OPTION_RE = /^(\d+)\.(\d+)\.(\d+)$/;

	var fs = require('fs'),
	    path = require('path'),
	    request = require('request'),
	    crypto = require('crypto');

	grunt.registerTask('engine', function(){

		// choose engine url or local path
		var engine = grunt.config('engine');

		switch(true){

			// version specified
			case engine === 'latest':
			case VERSION_OPTION_RE.test(engine):
				var USE_HTTP = true;
				var ENGINE_PATH = grunt.config('ENGINE_CDN');
			break;

			// if file specified exists in a file system
			case fs.existsSync(engine):
				var USE_FS = true;
				var ENGINE_PATH = engine;
			break;

			// in any other case we use CDN version (default one)
			default:
				var USE_HTTP = true;
				var ENGINE_PATH = engine;

		}

		// if we use a cache then try to find a file in cache
		if (!grunt.config('no-cache')){
			grunt.config('engine-file', encodeEnginePath(ENGINE_PATH));

			var cacheFile = path.join(grunt.config('CACHE_DIR'), grunt.config('engine-file')),
			    destFile = path.join(grunt.config('dest'), grunt.config('engine-file'));

			if (USE_HTTP && !grunt.file.exists(cacheFile)){

				var done = this.async();

				grunt.log.writeln('Downloading file from: ' + ENGINE_PATH);

				request(ENGINE_PATH, function(error, response, body){
					grunt.file.write(cacheFile, body);
					grunt.log.writeln('File written to cache: ' + cacheFile);

					grunt.file.copy(cacheFile, destFile);
					grunt.log.writeln('Engine file saved: ' + destFile);

					done();
				});
			} else if (USE_FS && !grunt.file.exists(cacheFile)) {
				grunt.log.writeln('File copied to cache: ' + ENGINE_PATH);
				grunt.file.copy(ENGINE_PATH, cacheFile);
				grunt.log.writeln('Generated file in cache: ' + cacheFile);
				grunt.log.writeln('Engine file saved: ' + destFile);
				grunt.file.copy(cacheFile, destFile);
			} else {
				grunt.log.writeln('File found in cache: ' + cacheFile);
				grunt.log.writeln('Engine file saved: ' + destFile);
				grunt.file.copy(cacheFile, destFile);
			}

		} else {
			grunt.config('engine-file', ENGINE_PATH);
			grunt.log.writeln('Engine file saved: ' + ENGINE_PATH);
		}

	});

	/**
	 * Helper used to encode got engine path: remote URL or local path.
	 *
	 * @param  {String} enginePath
	 * @return {String}
	 */
	function encodeEnginePath(enginePath){

		// create hash
		var shasum = crypto.createHash('sha1');
		shasum.update(enginePath);
		var hash = shasum.digest('hex');

		// concat hash with path basename
		return 'engine-' + hash + '-' + path.basename(enginePath);

	}

};
