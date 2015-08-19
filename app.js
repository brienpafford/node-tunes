// Require modules

var fs 					= require('fs');
var express			= require('express');
var morgan 			= require('morgan');

// Require Routes

var routes 			= require('./routes/index');
var artists 		= require('./routes/artists');
var albums 			= require('./routes/albums');
var bodyParser	= require('body-parser');

var app 			= express();


// App set

	require('./lib/secrets');
	require('./lib/mongodb');

	app.set('view engine', 'ejs');
	app.set('case sensitive routing', true);


// // Logging

// 	var logStream = fs.createWriteStream('access.log', {flags: 'a'});
//   app.use(morgan('combined', {stream: logStream}));
// 	app.use(morgan('dev'));

// 	app.use(function (req, res, next) {
//   var client = require('./lib/loggly')('incoming');

//   client.log({
//     ip: req.ip,
//     date: new Date(),
//     url: req.url,
//     status: res.statusCode,
//     method: req.method
//   });
//   next();
// });


// App use routes
	
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({ extended : false }));

	app.use('/', routes);
	app.use('/artists', artists);
	app.use('/albums', albums);

	app.locals.title = 'nodeTunes'

// // Loggly Logging
// 	app.use(function (req, res) {
// 		var client = require('./lib/loggly')('error');

// 		client.log({
//     ip: req.ip,
//     date: new Date(),
//     url: req.url,
//     status: res.statusCode,
//     method: req.method,
//     stackTrace: err.stack
//   });

//   // pass 4 arguments to create an error handling middleware
//   console.log('ERRRRRRRRRR', err.stack);
//   res.status(500).send('My Bad');
// });
	// })


var server 			= app.listen(3000, function () {
  var host 			= server.address().address;
  var port 			= server.address().port;
  console.log(process.env);
  console.log('Serving at http://%s:%d', host, port);
});