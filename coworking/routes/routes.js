var express = require('express');
var router = express.Router();

var locations = [
  '',
  'Boston',
  'New York City',
  'San Francisco',
  'Seattle',
  'Washington DC'
];

/* ---
 * GET/POST home page.
 */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({},{},function(e, docs){
    res.render('index', {
      title: 'Coworking Co-op',
      userlist: docs,
      locations: locations
    });
  });
});

router.post('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  var location = req.body.location;
  var query = {};

  // Set up the search query, if there is one.
  // TODO: Make this RESTful!
  if (location) {
    query.location = location;
  }

  collection.find(query,{},function(e, docs){
    res.render('index', {
      title: 'Coworking Co-op',
      userlist: docs,
      location: location,
      locations: locations
    });
  });
});


/* ---
 * GET Registration page.
 */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Coworking Co-op: Registration' });
});


/* ---
 * POST to Add User Service
 */
router.post('/adduser', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var username = req.body.username;
  var twitter = req.body.twitter;
  var location = req.body.location;
  var work = req.body.work;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
    "username": username,
    "twitter": twitter,
    "location": location,
    "work": work
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("/");
    }
  });
});

module.exports = router;
