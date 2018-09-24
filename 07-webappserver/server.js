/*
	dataParser.js
	serveStatic.js
	serveCalculator.js
	notFoundHandler.js
*/
var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.png', '.jpg', '.ico', '.xml', '.txt'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) >= 0
}

var server = http.createServer(function(req, res){
	console.log('a new connection is established for ', req.url);
	var urlObj = url.parse(req.url);
	var resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;

	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
	
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (resourceName === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(urlObj.query),
			op = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end();
	} else if (resourceName === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(rawData),
				op = data.op,
				n1 = parseInt(data.n1),
				n2 = parseInt(data.n2),
				result = calculator[op](n1, n2);

			res.write(result.toString());
			res.end();
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});
server.listen(8080);
console.log('server listening on 8080!');