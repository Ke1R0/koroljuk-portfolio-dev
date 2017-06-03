const mongoose = require('mongoose');
const RespUtils = require('../common/responseUtils');
const utils = require('../common/utils');
const Image = mongoose.model('Image');

function getById(req, res) {
  const params = req.params;
  if (params && params.id) {
    Image
      .findById(params.id, function(err, doc) {
        if (err) {
          RespUtils.internalError(res, err);
        } else {
          res.contentType(`image/${utils.getExtName(doc.name, true)}`);
          res.send(doc.data);
        }
      });
  } else {
    RespUtils.badRequest(res);
  }
}

module.exports.getById = getById;
