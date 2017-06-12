const passport = require('passport');
const mongoose = require('mongoose');
const RespUtils = require('../common/responseUtils');
const User = mongoose.model('User');

module.exports.register = function(req, res) {
  //TODO: remove after registration became necessary
  RespUtils.forbidden(res);
  if (!req.body.name || !req.body.email || !req.body.password) {
    RespUtils.badRequest(res, {'message': 'All fields required'});
    return;
  }
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(err => {
    if (err) {
      RespUtils.notFound(res, err);
    } else {
      let token = user.generateJwt();
      RespUtils.ok(res, {'token': token});
    }
  });
};

module.exports.login = function(req, res) {
  if (!req.body.email || !req.body.password) {
    RespUtils.badRequest(res, {'message': 'All fields required'});
    return;
  }
  passport.authenticate('local', function(err, user, info) {
    var token;
    if (err) {
      RespUtils.notFound(res, err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      RespUtils.ok(res, {'token': token});
    } else {
      RespUtils.unauthorized(res, info);
    }
  })(req, res);
};
