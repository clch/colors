var http = require('http'),
	express = require('express'),
	hogan = require('hogan.js'),
	engines = require('consolidate');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('.'));

var demoId;
var userNum = -1;

app.engine('html', engines.hogan);
app.set('views', __dirname);
app.set('view engine', 'html'); 

app.get('/demo', function(req, res){
	res.render('demo');
});

// app.get('/', function(req, res){
// 	userNum++;
// 	res.render('user', {num: userNum});
// });

app.get('/', function(req, res){
	res.render('user');
});

// io.on('connection', function(socket){
// 	socket.on('demo', function(){
// 		demoId = socket.id;
// 	});

// 	socket.on('move', function(num, x, y){
// 		io.to(demoId).emit('move', num, x, y);
// 	});
// });


app.listen(8080, function(){
  console.log('listening on port 8080');
});