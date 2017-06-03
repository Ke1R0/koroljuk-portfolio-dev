const HttpCode = require('http-status-codes');

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

function sendBaseResponse(res, content, err) {
  if (err) {
    sendJsonResponse(res, HttpCode.NOT_FOUND, err);
  } else {
    sendJsonResponse(res, HttpCode.OK, content);
  }
}

function badRequest(res, content) {
  sendJsonResponse(res, HttpCode.BAD_REQUEST, content);
}

function forbidden(res, content) {
  sendJsonResponse(res, HttpCode.FORBIDDEN, content);
}

function ok(res, content) {
  sendJsonResponse(res, HttpCode.OK, content);
}

function created(res, content) {
  sendJsonResponse(res, HttpCode.CREATED, content);
}

function notFound(res, content) {
  sendJsonResponse(res, HttpCode.NOT_FOUND, content);
}

function unauthorized(res, content) {
  sendJsonResponse(res, HttpCode.UNAUTHORIZED, content);
}

function internalError(res, content) {
  sendJsonResponse(res, HttpCode.INTERNAL_SERVER_ERROR, content);
}

module.exports.sendBaseResponse = sendBaseResponse;
module.exports.sendJsonResponse = sendJsonResponse;
module.exports.badRequest = badRequest;
module.exports.forbidden = forbidden;
module.exports.ok = ok;
module.exports.created = created;
module.exports.notFound = notFound;
module.exports.unauthorized = unauthorized;
module.exports.internalError = internalError;
