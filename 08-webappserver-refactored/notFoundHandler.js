module.exports = function(res){
	console.log('[@notFoundHanlder] serving 404');
	res.statusCode = 404;
	res.end();
};