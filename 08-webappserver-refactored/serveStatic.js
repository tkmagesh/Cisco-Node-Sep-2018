var fs = require('fs'),
	path = require('path');

var staticExtns = ['.html', '.css', 	, '.png', '.jpg', '.ico', '.xml', '.txt'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
		var resourcePath = path.join(staticResourcePath, resourceName);
		if (isStatic(resourceName) && fs.existsSync(resourcePath)){
			var stream = fs.createReadStream(resourcePath);
			stream.pipe(res);
			stream.on('end', function(){
				res.end();
				return next();
			});
		} else {
			return next();
		}
	};
};