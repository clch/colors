var http = require('http'),
	express = require('express'),
	//p5 = require('p5'),
	hogan = require('hogan.js'),
	engines = require('consolidate');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('.'));

app.engine('html', engines.hogan);
app.set('views', __dirname);
app.set('view engine', 'html'); 

app.get('/', function(req, res){
	res.render('demo');
});

app.get('/user', function(req, res){
	res.render('user');
})

// io.on('connection', function(socket){
// 	socket.on('join', function())
// });




app.listen(8080);