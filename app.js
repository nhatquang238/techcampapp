var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	// res.sendfile('/json/events.json');
	console.log('request for / receive');
	res.send({'name':'quang'});
});

app.listen(process.env.PORT || 3000);
console.log('Starting server on port '+ (process.env.PORT || 3000));