const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('express-jwt');

const ctrlCategories = require('../controllers/categories');
const ctrlPictures = require('../controllers/pictures');
const ctrlAuth = require('../controllers/authentication');
const ctrlAccessRights = require('../controllers/accessRights');
const ctrlImages = require('../controllers/images');

const jsonParser = bodyParser.json();
const upload  = multer({ storage: multer.memoryStorage() });
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'Authorization'
});
const router = express.Router();

router.get('/categories', ctrlCategories.list);
router.get('/pictures/:id', ctrlPictures.getById);
router.get('/pictures', ctrlPictures.list);
router.post('/pictures', auth, upload.single('file'), ctrlPictures.create);
router.put('/pictures/:id', auth, jsonParser, ctrlPictures.updateById);
router.delete('/pictures/:id', auth, ctrlPictures.deleteById);
router.post('/register', jsonParser, ctrlAuth.register);
router.post('/login', jsonParser, ctrlAuth.login);
router.get('/images/:id', ctrlImages.getById);
router.get('/access-rights/:sectionName/:userId', auth, ctrlAccessRights.getRights);

module.exports = router;
