var fs = require('fs');

var stream = fs.createReadStream('sample.txt', { encoding : 'utf8'});
/* open, data, end, close, error */

/*stream.on('data', function(chunk){
	console.log(chunk);
});*/

stream.pipe(process.stdout);

stream.on('end', function(){
	console.log('Thats all folks!');
});

stream.on('error', function(err){
	console.log(err);
});
