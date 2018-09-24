var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var server = http.createServer(function(req, res){
	console.log('a new connection is established for ', req.url);
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var data = querystring.parse(urlObj.query),
		op = data.op,
		n1 = parseInt(data.n1),
		n2 = parseInt(data.n2),
		result = calculator[op](n1, n2);

	res.write(result.toString());
	res.end();
});

server.listen(8585);

console.log('server listening on 8585!');