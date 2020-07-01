const config = require('./lib/config');
const authorization = require('./lib/authorization');
const logger = require('./lib/logger');
const { BaseModel, ModelNotFoundError } = require('./lib/model');
const storage = require('./lib/storage');
const sms = require('./lib/transport/sms');

/**
 * Middleware
 */
const authorize = require('./lib/middleware/authorize');
const error = require('./lib/middleware/error');
const uploadTmp = require('./lib/middleware/upload-tmp');
const validateRequest = require('./lib/middleware/validate-request');

/**
 * Exception
 */
const alreadyExistError = require('./lib/exception/already-exist-error');
const notAllowError = require('./lib/exception/not-allow-error');
const notFoundError = require('./lib/exception/not-found-error');
const responseError = require('./lib/exception/response-error');


module.exports = {
  config,
  authorization,
  logger,
  BaseModel,
  ModelNotFoundError,
  storage,
  sms,
  authorize,
  error,
  uploadTmp,
  validateRequest,
  alreadyExistError,
  notAllowError,
  notFoundError,
  responseError,
};
