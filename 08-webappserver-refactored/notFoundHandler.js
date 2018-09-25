module.exports = function(req, res, next){
	if (!res.finished){
		console.log('[@notFoundHanlder] serving 404');
		res.statusCode = 404;
		res.end();
	}
	next();
};