module.exports = function(grunt){

	// types of tokens in esprima
	var BOOLEAN = 'Boolean',
	    KEYWORD = 'Keyword',
	    IDENTIFIER = 'Identifier',
	    KEYWORD = 'Keyword',
	    NULL = 'Null',
	    NUMERIC = 'Numeric',
	    PUNCTUATOR = 'Punctuator',
	    STRING = 'String',
	    REGULAR_EXPRESSION = 'RegularExpression';

	// load esprima module
	var esprima = require('esprima');

	grunt.registerTask('keywords', function(){

		    // illegal keywords that are not recognized by esprima
		var illegal_keywords = {},
		    // list of all errors occured during parsing
		    errors = [];

		// we fill illegal_keywords object with keys from config
		grunt.config('ILLEGAL_KEYWORDS').forEach(function(keyword){
			illegal_keywords[keyword] = null;
		});

		var src = grunt.task.normalizeMultiTaskFiles({
			src: grunt.file.readJSON('package.json').files
		});

		// validate each set of files
		for (var k = 0; k < src.length; k++){
			var files = src[k].src;

			// validate each file
			for (var i = 0; i < files.length; i++){
				var path = files[i],
				    code = grunt.file.read(path);

				// if validation throws an error
				// we inform developer in which file this error occured
				validateKeywords(code, illegal_keywords, path, errors);
			}
		}

		if (errors.length){
			errors.forEach(function(e){
				grunt.log.error(e);
			});

			grunt.warn('Illegal keywords found');
		}

	});

	function validateKeywords(code, illegal_keywords, path, errors){

		// extract all tokens from a code
		var tokens = esprima.tokenize(code);

		for (var i = 0; i < tokens.length; i++){

			var token = tokens[i];

			switch (token.type){
				// if token is an identifier
				// and it is a recognized keyword we have to raise an error
				case IDENTIFIER:
					if (illegal_keywords.hasOwnProperty(token.value))
						errors.push(path + ': ' + 'Illegal keyword "'+token.value+'"');
			}
		}
	}

};
