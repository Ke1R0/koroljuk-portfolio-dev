const mongoose = require('mongoose');
const co = require('co');
const DbQueryBuilder = require('../common/dbQueryBuilder');
const RespUtils = require('../common/responseUtils');
const Picture = mongoose.model('Picture');
const imageDbStorage = require('../storages/imageDbStorage');

const DEF_PAGE_SIZE = 11;

function list(req, res) {
  const query = req.query;
  const dbQuery = DbQueryBuilder.buildDbQuery(query);
  const pageSize = +query.pageSize || DEF_PAGE_SIZE;
  const page = (+query.page || 1);
  const skip = pageSize * page - pageSize;

  Picture
    .find(dbQuery, 'name description categories imageId previewImageId')
    .limit(pageSize + 1)
    .sort({'_id': -1})
    .skip(skip)
    .exec(function(err, data) {
      let content = {
        hasMoreItems: data.length > pageSize,
        page: page
      };
      data.splice(pageSize);
      content.items = data;
      RespUtils.sendBaseResponse(res, content, err);
    });
}

function getById(req, res) {
  const params = req.params;
  if (params && params.id) {
    Picture
      .findById(params.id, function(err, data) {
        RespUtils.sendBaseResponse(res, data, err);
      });
  } else {
    RespUtils.badRequest(res);
  }
}

function create(req, res) {
  const file = req.file;
  if (file) {
    co(function*() {
      let primaryImage = yield imageDbStorage.save(file.originalname, file.buffer);
      let modifiedImageBuf = yield primaryImage.resize(350, 350);
      let previewImage = yield imageDbStorage.save(file.originalname, modifiedImageBuf);
      return new Picture({
        name: file.name,
        imageId: primaryImage._id,
        previewImageId: previewImage._id
      });
    }).then(picture => {
      picture.save((err, doc) => {
        RespUtils.sendBaseResponse(res, doc, err);
      });
    }).catch(err => {
      RespUtils.internalError(res, err);
    });
  } else {
    RespUtils.badRequest(res);
  }
}

function updateById(req, res) {
  //TODO: user validation
  const params = req.params;
  const body = req.body;
  if (params && params.id) {
    Picture.findOneAndUpdate({'_id': params.id},
      {
        name: body.name,
        description: body.description,
        categories: body.categories
      },
      {
        new: true
      },
      (err, data) => RespUtils.sendBaseResponse(res, data, err)
    );
  } else {
    RespUtils.badRequest(res);
  }
}

function deleteById(req, res) {
  //TODO: user validation
  const params = req.params;
  if (params && params.id) {
    Picture.findById(params.id, function(err, picture) {
      if (err) {
        RespUtils.internalError(res, err);
      } else if (!picture) {
        RespUtils.notFound(res, err);
      } else {
        picture.remove(function(err, data) {
          RespUtils.sendBaseResponse(res, data, err);
        });
      }
    });
  } else {
    RespUtils.badRequest(res);
  }
}

module.exports.list = list;
module.exports.getById = getById;
module.exports.create = create;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;
