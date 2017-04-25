var http = require('http');
//var rpio = require('rpio');
var fs = require('fs');

var timer = 0;
var red = 1;
var green = 1;
var blue = 1;

/*
rpio.init({gpiomem: false, mapping: 'gpio'});

rpio.open(12, rpio.OUTPUT, rpio.LOW);
rpio.open(16, rpio.OUTPUT, rpio.LOW);
rpio.open(21, rpio.OUTPUT, rpio.LOW);
*/

var server = http.createServer( function( request,  response ){
	
	if( request.method == "POST") {
		console.log("POST /");
		var body = '';
		request.on('data', function(data) {
			body += data;
		});
		request.on('end', function() {
			
			_colors = body.split("&");
			
			red = _colors[0].split("=")[1];
			green = _colors[1].split("=")[1];
			blue = _colors[2].split("=")[1];
			
			red = (red == "") ? 0 : red;
			green = (green == "") ? 0 : green;
			blue = (blue == "") ? 0 : blue;
			
			console.log("R/G/B/D:\t" + red + "/" + green + "/" + blue );
			
			timer = 0;
			
		});
	}
	
	var html = fs.readFileSync('index.html');
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(html);
	
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");
/*
function startRed() { rpio.write(12, rpio.HIGH); }
function stopRed() { rpio.write(12, rpio.LOW); }
function startGreen() { rpio.write(16, rpio.HIGH); }
function stopGreen() { rpio.write(16, rpio.LOW); }
function startBlue() { rpio.write(21, rpio.HIGH); }
function stopBlue() { rpio.write(21, rpio.LOW); }

setInterval(function() {
	if ( timer % +red != 0) startRed();
	else stopRed();
	
	if ( timer % +green != 0) startGreen();
	else stopGreen();
	
	if (  timer % +blue != 0) startBlue();
	else stopBlue();
	
	timer++;
}, 1);
*/

