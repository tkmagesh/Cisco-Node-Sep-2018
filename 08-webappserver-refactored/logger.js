module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date();
		var elapsedTime = endTime - startTime;
		console.log(req.method + '\t' + res.statusCode + ' ' + req.urlObj.pathname + ' ' + elapsedTime + 'ms');
	});
	next();
};