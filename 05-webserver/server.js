var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req, res){
	console.log('a new connection is established for ', req.url);
	var resourceName = req.url === '/' ? 'index.html' : req.url,
		resourcePath = path.join(__dirname, resourceName);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resourcePath).pipe(res);
});

server.listen(8080);

console.log('server listening on 8080!');