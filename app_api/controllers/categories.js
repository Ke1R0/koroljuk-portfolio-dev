const mongoose = require('mongoose');
const RespUtils = require('../common/responseUtils');
const Categories = mongoose.model('Category');

function list(req, res) {
  Categories
    .find(req.query, 'title url icon description code')
    .sort({'order': 1})
    .exec(function(err, data) {
      RespUtils.sendBaseResponse(res, data, err);
    });
}

module.exports.list = list;