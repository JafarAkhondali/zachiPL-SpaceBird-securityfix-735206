'use strict';

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    pkg = require('./package.json');

var PORT = pkg.server.port,
    BUILD_DIR = pkg.dest;

/**
 * Write response head, data and send it.
 *
 * @param  {http.ServerResponse} resp
 * @param  {Number} code
 * @param  {String|Buffer} msg
 */
function sendResponse(resp, code, msg){
	resp.writeHead(code);
	resp.end(msg);
}

// create new http server
var server = http.createServer(function(req, resp){

	var uri = url.parse(req.url).pathname,
	    filename = path.join(process.cwd(), BUILD_DIR, uri);

	// check whether file exists
	fs.exists(filename, function(exists){
		if (!exists) return sendResponse(resp, 404, '404 Not Found\n');

		// returns `index.html` for directories
		fs.stat(filename, function(err, stat){
			if (err) return sendResponse(resp, 500, err.message);

			if (stat.isDirectory()) filename += '/index.html';

			// returns file buffer
			fs.readFile(filename, function(err, file){
				if (err) return sendResponse(resp, 500, err.message);
				sendResponse(resp, 200, file);
			});
		});
	});

});

server.listen(PORT);

console.log('Solpeo HTTP server running at http://localhost:%s', PORT);
console.log('===================================================');
console.log('Root directory is: ' + path.join(process.cwd(), BUILD_DIR));