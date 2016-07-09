var express = require('express');
var router = express.Router();


router.get('/list', function(req, res, next) {
  res.render('templates/gallery-list');
});
router.get('/', function(req, res, next) {
  res.render('gallery', { title: 'Художник Анна Королюк'});
});

module.exports = router;
