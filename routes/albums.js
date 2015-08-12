// Require modules

var express 			= require('express');
var router 				= express.Router();


// Get from Database

router.get('/', function (req, res) {
	var collection = global.db.collection('albums');

	collection.find().toArray(function (err, albums) {
		var formattedAlbums = albums.map(function (albums) {
		return {
			title: 			albums.title,
			year: 			albums.year,
			artistID: 	albums.id,
			};
		});
	res.render('templates/albums-index', {albums: formattedAlbums});
	});
});

// Post to Database

router.post('/', function (req, res) {
	var collection = global.db.collection('albums');

	console.log(req.body)

	collection.save(req.body, function () {
		res.redirect('/albums')
	});
});

module.exports = router;