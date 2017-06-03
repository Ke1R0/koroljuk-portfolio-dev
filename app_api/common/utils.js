const path = require('path');

function isEmpty(value) {
  let result = (value instanceof Array) ?
    value.length === 0 :
    value == null || value === '';
  return result;
}

function isString(s) {
  return typeof(s) === 'string';
}

function getFileName(filePath) {
  return path.basename(filePath);
}

function getExtName(fileName, excludeDot) {
  let extName = '';
  if (isString(fileName)) {
    extName = path.extname(fileName);
    if (excludeDot) {
      extName = extName.replace(/^\./, '');
    }
  }
  return extName;
}

module.exports.isEmpty = isEmpty;
module.exports.getFileName = getFileName;
module.exports.getExtName = getExtName;
