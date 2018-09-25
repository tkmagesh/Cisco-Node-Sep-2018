var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../data/taskdb.json');

function get(callback){
	fs.readFile(dbFile, {encoding : 'utf8'}, function(err, contents){
		if (!err){
			var tasks = JSON.parse(contents);
			return callback(null, tasks);
		} else {
			callback(err, null);
		}
	});
}
function save(data, callback){
	fs.writeFile(dbFile, JSON.stringify(data), function(err, contents){
		if (!err){
			callback(null);
		} else {
			callback(err);
		}
	});
}

module.exports = { get, save };