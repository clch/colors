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
var userNum = -1;
var locMap = new Map();
var initColorMap = new Map();
var colorMap = new Map();

app.get('/demo', function(req, res){
	res.render('demo');
});

app.get('/', function(req, res){
	userNum++;
	res.render('user', {num: userNum});
});

io.on('connection', function(socket){
	socket.on('join', function(num){
		socket.num = num;
		var c = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			c[i] = Math.floor(Math.random() * 230 + 25);
		}
		initColorMap.set(num, c);
		socket.emit('color', c[0], c[1], c[2]);
	});

	socket.on('demo', function(){
		demoId = socket.id;
	});

	socket.on('move', function(num, x, y){
		locMap.set(num, {x, y});
		io.to(demoId).emit('move', num, x, y);
	});

	socket.on('disconnect', function(){
		io.to(demoId).emit('disconnect', socket.num);
	});
});

function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))
}

server.listen(8080, function(){
  console.log('listening on port 8080');
});