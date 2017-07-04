const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  hash: String,
  salt: String
});

function generateHash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
}

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = generateHash(password, this.salt);
};

userSchema.methods.validPassword = function(password) {
  return this.hash === generateHash(password, this.salt);
};

userSchema.methods.generateJwt = function() {
  //Token expiration is 1 hour
  let expiry =  Math.floor(Date.now() / 1000) + (60 * 60);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry),
  }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema, 'users');
