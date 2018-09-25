var chalk = require('chalk');

module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date();
		var elapsedTime = endTime - startTime;
		console.log(chalk.blue(req.method) + '\t' + chalk.red(res.statusCode) + ' - ' + chalk.cyan(req.urlObj.pathname) + ' ' + elapsedTime + 'ms');
	});
	next();
};