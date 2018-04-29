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

var demoId, userId;
var locMap = new Map();

app.get('/demo', function(req, res){
	res.render('demo');
});

app.get('/', function(req, res){
	res.render('user');
});

io.on('connection', function(socket){
	socket.on('demo', function(){
		demoId = socket.id;
	});

	socket.on('user', function(){
		userId = socket.id;
	});

	socket.on('join', function(num){
		io.to(demoId).emit('join', num);
	});

	socket.on('move', function(num, x, y){
		io.to(demoId).emit('move', num, x, y);
	});

	socket.on('color', function(num, r, g, b){
		io.to(userId).emit('color', num, r, g, b);
	});
});


server.listen(8080, function(){
  console.log('listening on port 8080');
});