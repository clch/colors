var http = require('http'),
	express = require('express'),
	hogan = require('hogan.js'),
	engines = require('consolidate');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('templates'));


app.engine('html', engines.hogan);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html'); 

var demoId;
var locMap = new Map();
var initColorMap = new Map();

app.get('/demo', function(req, res){
	res.render('demo');
});

app.get('/', function(req, res){
	res.render('usertest');
});

io.on('connection', function(socket){
	socket.on('join', function(num){
		var c = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			c[i] = Math.floor(Math.random() * 230 + 25);
		}
		var pos = {x: 0, y: 0};
		locMap.set(num, pos);
		initColorMap.set(num, c);
		socket.emit('color', num, c[0], c[1], c[2]);
		io.to(demoId).emit('color', num, c[0], c[1], c[2]);	
	});

	socket.on('demo', function(){
		demoId = socket.id;
	});

	socket.on('move', function(num, x, y){
		var pos = {x, y};
		locMap.set(num, pos);
		io.to(demoId).emit('move', num, x, y);
		var initColor = initColorMap.get(num);
		if (initColor != null) {
			var c = initColor.slice();
			for (var k of initColorMap.keys()){
				if (k != num) {
					var pos2 = locMap.get(k);
					var d = dist(pos, pos2)/30;
					if (d < 10) {
						var initColor2 = initColorMap.get(k);
						var c2 = initColor2.slice();
						var cDiff = colorDiff(initColor, c2, d);
						for (var i = 0; i < 3; i++) {
							c[i] -= cDiff[i];
							c2[i] += cDiff[i];
						}
						socket.emit('color', k, c2[0], c2[1], c2[2]);	
						io.to(demoId).emit('color', k, c2[0], c2[1], c2[2]);
					}

				}
			}
			socket.emit('color', num, c[0], c[1], c[2]);	
			io.to(demoId).emit('color', num, c[0], c[1], c[2]);	
		}
	});

	socket.on('disconnect', function(){
		locMap.delete(socket.num);
		initColorMap.delete(socket.num);
		io.to(demoId).emit('disconnect', socket.num);
	});
});

function colorDiff(c1, c2, d) {
	return [(c1[0] - c2[0])/d, (c1[1] - c2[1])/d, (c1[2] - c2[2])/d];
}

function dist(v1, v2) {
	var res = Math.sqrt(Math.pow(v1.x-v2.x, 2) + Math.pow(v1.y-v2.y, 2));
	if (res < 100) {
		res = 100;
	}
	return res;
}

server.listen(8080, function(){
  console.log('listening on port 8080');
});