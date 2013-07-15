var express = require('express'),
	app = require('http').createServer(handler),
	io = require('socket.io').listen(app/*, {log : false}*/),
	fs = require('fs'),
	url = require('url');

function handler (req, res) {

	// console.log(req.url);

	fs.readFile(__dirname + req.url, function (err, data) {
	
		if (err) {
			res.writeHead(500);
			return res.end('Error');
		}

		res.writeHead(200);
		res.end(data);
	
	});	

};

// var server = http.createServer(app)
	
app.listen(8080);

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  /*socket.on('my other event', function (data) {
  	sp.write(new Buffer([0x01]));
    console.log(data);
  });*/
});


var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var sp = new SerialPort("/dev/tty.usbmodem1d11", { 
	parser: serialport.parsers.readline("\n"),
	baudrate : 9600
}, true);

sp.on("open", function (){
	sp.on("data", function (data){
		// io.sockets.emit('button', { button: data });
		// console.log(data);
		io.sockets.emit('message', {"buttons" : data});
	});
});

// app.listen(3000);
