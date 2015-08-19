// Require modules 

var express     = require('express');

var router 			= express.Router();

// Get from Database

router.get('/', function (req, res) {
	var collection = global.db.collection('artists');

	collection.find().toArray(function (err, artists) {
		var formattedArtists = artists.map(function (artists) {
		return {
			name: 		  artists.name,
			genre: 			artists.genre,
			bio: 				artists.bio,
			wiki: 			artists.wiki,
		};
	});

	res.render('templates/artists-index', {artists: formattedArtists})
	});
});

// Search Database

	router.get('/search', function (req, res) {
		var collection = global.db.collection('artists');

		collection.find({name: req.query.name}).toArray(function(err, artists) {
			var formattedArtists = artists.map(function(artists){
				return{
					name: 	artists.name,
					genre: 	artists.genre,
					bio: 		artists.bio,
					wiki: 	artists.wiki

				}
			})
			res.render('templates/artists-index', {artists: formattedArtists})
			console.log(formattedArtists)
		})
	})


// Post to Database

router.post('/', function (req, res) {
	var collection = global.db.collection('artists');

	// console.log(req.body)

	collection.save(req.body, function () {
		res.redirect('/artists')
	});
});

module.exports = router;