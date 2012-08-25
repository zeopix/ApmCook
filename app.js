
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http   = require('http');

var app = module.exports = express.createServer(),io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/create', function(req,res){
	res.render("create");
});

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


io.sockets.on('connection', function (socket) {
	
	
	var options = {
	    host: 'gdata.youtube.com',
	    path: '/feeds/api/videos?q=frases+apm&alt=json&orderby=relevance&max-results=20&v=2',
	};
	
	
	var req = http.request(options, function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
  			socket.emit('videos', { 'data': output });
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
        socket.emit("error",{'message':err.message})
    });

    req.end();
    
    	
    socket.on('message',function(data){
    	console.log("Socket Message: "+data);
    })
    
});
