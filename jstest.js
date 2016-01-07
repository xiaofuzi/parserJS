var JSHighlighter = require('./lib/js-highlight'),
	fs = require('fs');

var readJsFile = function(path){
	fs.readFile(path, 'utf8', function(err, data){
		if(err) throw err;
		console.log(JSHighlighter.highlight(data));
	})
}

readJsFile('./lib/utils.js');
