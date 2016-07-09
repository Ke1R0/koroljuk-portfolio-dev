var express = require('express');
var router = express.Router();

router.get('/pricesanddelivery', function(req, res, next) {
  res.render('prices_and_delivery', { title: 'Художник Анна Королюк'});
});
router.get('/Home', function(req, res, next) {
  res.render('index', { title: 'Художник Анна Королюк'});
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Художник Анна Королюк'});
});
module.exports = router;
