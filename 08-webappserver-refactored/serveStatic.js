var fs = require('fs'),
	path = require('path');

var staticExtns = ['.html', '.css', '.js', '.png', '.jpg', '.ico', '.xml', '.txt'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);

		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		//fs.createReadStream(resourcePath).pipe(res);
		var stream = fs.createReadStream(resourcePath);
		stream.on('data', function(chunk){
			console.log('[@serveStatic] serving chunk to response');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[@serveStatic] ending response');
			res.end();
		});
	}
}