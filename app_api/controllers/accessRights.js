const mongoose = require('mongoose');
const RespUtils = require('../common/responseUtils');
const AccessRights = mongoose.model('AccessRights');

module.exports.getRights = function(req, res) {
  const params = req.params;
  const sectionName = params.sectionName;
  const userId = params.userId;
  if (!sectionName || !userId) {
    RespUtils.badRequest(res);
  }
  AccessRights
    .findOne({sectionName: sectionName, userId: userId})
    .exec()
    .then(rights => RespUtils.ok(res, {accessRights: rights}))
    .catch(err => RespUtils.notFound(res, err));
};