var express = require('express');
var router = express.Router();
var services = require('../controllers/services');

router.get('/pricesanddelivery', services.pricesAndDelivery);
router.get('/Home', services.mainPage);
router.get('/', services.mainPage);
module.exports = router;
