const mongoose = require('mongoose');
const utils = require('../common/utils');
const Image = mongoose.model('Image');

/**
 * Saves image to db.
 * @param {Object} name Optional parameter.
 * @param {Object} buffer Binary data of the image.
 */
function save(name, buffer) {
  let imgName = '';
  if (buffer === undefined) {
    buffer = name;
  } else {
    imgName = name;
  }
  return new Promise((resolve, reject) => {
    if (utils.isEmpty(buffer)) {
      reject(new Error('Parameter file should be set'));
    } else {
      const image = new Image({
        name: imgName,
        data: buffer
      });
      image.save((err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    }
  });
}

module.exports.save = save;