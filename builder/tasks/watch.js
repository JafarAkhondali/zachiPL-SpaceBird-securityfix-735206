module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.config('watch', {
		html: {
			get files(){
				return grunt.config('files');
			},
			tasks: ['concat:html']
		},
		assets: {
			get files(){
				return grunt.config('assets');
			},
			tasks: ['copy:assets']
		}
	});

};