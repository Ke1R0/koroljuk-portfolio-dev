var express = require('express');
var router = express.Router();
var gallery = require('../controllers/gallery');

router.get('/list', gallery.list);
router.get('/', gallery.mainPage);

module.exports = router;
