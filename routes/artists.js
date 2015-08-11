var express     = require('express');
var moment 			= require('moment');

var router 			= express.Router();

router.get('/', function (req, res) {
	var collection = global.db.collection('artists');

	collection.find().toArray(function (err, artists) {
		var formattedArtists = artists.map(function (artists) {
		return {
			name: 		  artists.name,
			genre: 			artists.genre,
			bio: 				artists.bio,
			wiki: 			artists.wiki,
			createdAt: 	moment(artists._id.getTimestamp()).fromNow()
		};
	});

	res.render('templates/artists-index', {artists: formattedArtists})
	});
});

// router.get('/new', function (req, res) {
// 	res.render('templates/artists-new');
// })

router.post('/', function (req, res) {
	var collection = global.db.collection('artists');

	console.log(req.body)

	collection.save(req.body, function () {
		res.redirect('/artists')
	});
});

module.exports = router;