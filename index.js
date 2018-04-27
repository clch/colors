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

app.get('/demo', function(req, res){
	res.render('demo');
});

app.get('/', function(req, res){
	userNum++;
	var c = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		c[i] = Math.floor(Math.random() * 230 + 25);
	}
	res.render('user', {num: userNum, R: c[0], G: c[1], B: c[2]});
});

io.on('connection', function(socket){
	socket.on('demo', function(){
		demoId = socket.id;
	});

	socket.on('move', function(num, x, y){
		io.to(demoId).emit('move', num, x, y);
	});
});

server.listen(8080, function(){
  console.log('listening on port 8080');
});