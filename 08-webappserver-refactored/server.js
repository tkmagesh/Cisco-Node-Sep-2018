var http = require('http');
	
var dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler');

var _middlewares = [dataParser, serveStatic, serveCalculator, notFoundHandler];

var server = http.createServer(function(req, res){
	/*dataParser(req);
	console.log(req.method + '\t' + req.urlObj.pathname);
	serveStatic(req, res);
	serveCalculator(req, res);
	notFoundHandler(res);*/

	function exec(req, res, middlewares){
		var first = middlewares[0],
			remaining = middlewares.slice(1),
			next = function(){
				exec(req, res, remaining);
			};
		if (typeof first === 'function')
			first(req, res, next);
	}
	exec(req, res, _middlewares);

});

server.listen(8080);
console.log('server listening on 8080!');