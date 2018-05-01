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
var userMap = new Map();
var userNum = -1;

app.get('/demo', function(req, res){
	res.render('demo');
});

app.get('/', function(req, res){
	userNum++;
	res.render('user', {num: userNum});
});

io.on('connection', function(socket){
	socket.on('demo', function(){
		demoId = socket.id;
	});

	socket.on('join', function(num){
		socket.num = num;
		userMap.set(num, socket.id);
		io.to(demoId).emit('join', num);
	});

	socket.on('move', function(num, x, y){
		io.to(demoId).emit('move', num, x, y);
	});

	socket.on('color', function(num, r, g, b){
		var userId = userMap.get(num);
		io.to(userId).emit('color', r, g, b);
	});

	socket.on('disconnect', function(){
		userMap.delete(socket.num);
		io.to(demoId).emit('disconnect', socket.num);
	});
});


server.listen(8080, function(){
  console.log('listening on port 8080');
});