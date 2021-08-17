module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		babel: {
			options: {
				presets: ['react']
			},
		
		dist: {
			src: ['views/hello.jsx'],
			dest: 'views/js/hello.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask('default', ['babel']);
};