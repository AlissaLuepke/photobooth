var http = require('http');
var fs = require('fs');

var jpegExtractor = require('jpeg-extractor');
var fileOnWrite = require('file-on-write');

require('./ext.js')();

// test regular file
var mjpeg = "http://raspberrypi:8000/stream";

var count = 0;
var je = jpegExtractor().on('image', function (image) {
});

var fow = new fileOnWrite({
	filename: function() {
		return "testImage";
	},
	path: "./",
	ext: ".jpg"
});

var server = http.createServer( function( request,  response ){
	
	// Analyse Request
	console.log( ">" + request.url);
	
	// Base URL requested
	if ( request.url == "/" ) {
		
		// Commands via POST ?
		if( request.method == "POST") {
		
			console.log("-> POST /");
			
			// get POST data
			var body = '';
			request.on('data', function(data) {
				body += data;
			});
			// Handle input with changeSettings function
			request.on('end', changeSettings(body, response));
			
		} else {
			// Display standard page
			var html = fs.readFileSync('stream.html');
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(html);
		}
		
	} else if ( request.url.split("/")[1] == "pre" ) {
		
		console.log("-> /pre - transmitting new picture");
		
		sendPreview(response);

	} else  {
		
		var path = request.url.slice(1);
		var ext = path.split(".");
		ext = ext[ext.length-1];
		
		console.log("-> " + path);
		
		if ( fs.existsSync(path) ) {
			
			// requested existing file
			var html = fs.readFileSync(path);
			// get mime type
			ext = getExtension(ext);
			
			console.log("<< 200 " + ext);
			response.writeHead(200, {"Content-Type": ext});
			response.end(html);
			
		} else {
			
			console.log("<< 404 not found");
			// no known route and no existing file		
			response.writeHead(404, {"Content-Type": "text/html"});
			response.end();
			
		}
	}
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");

function changeSettings( body, response ) {
	console.log("<<" + body);
	response.writeHead(200, {"Content-Type": "text/json"});
	response.end('{"status":"ok"}');
}

function sendPreview( response ) {
	console.log("<< new preview" );
	response.writeHead(200, {"Content-Type": "text/json"});
	response.end('{"status":"ok"}');
}
