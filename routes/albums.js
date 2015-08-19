// Require modules

var express 			= require('express');
var router 				= express.Router();
var ObjectID 			= require('mongodb').ObjectID;



// Route

router.get('/', function(req, res) {
    res.render('templates/albums-index');
});

// Get from Database

router.get('/search', function(req, res) {
  var collection = global.db.collection('artists');
  var artistName = new RegExp(req.query.name,"i");
  collection.find({name: artistName}, function(err, cursor) {
    cursor.toArray(function(err, artists) {
      res.send(artists);
    })
    //res.render('templates/artists');
  });

});

// Post to Database

router.post('/new', function (req, res) {
	var collection = global.db.collection('albums');

	var album = {
		album: req.body.album,
		artist: ObjectID(req.body.selected)
	};

	collection.save(album, function (err, data) {
		// console.log(data.ops[0].artists)

		var artistID = data.ops[0].artist;
		var albumID  = data.ops[0]._id;
		res.redirect('/')
	});
});

module.exports = router;