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
const errorHandler = require('./lib/middleware/error-handler');
const uploadTmp = require('./lib/middleware/upload-tmp');
const validateRequest = require('./lib/middleware/validate-request');

/**
 * Exception
 */
const AlreadyExistError = require('./lib/exception/already-exist-error');
const NotAllowError = require('./lib/exception/not-allow-error');
const NotFoundError = require('./lib/exception/not-found-error');
const ResponseError = require('./lib/exception/response-error');


module.exports = {
  config,
  authorization,
  logger,
  BaseModel,
  ModelNotFoundError,
  storage,
  sms,
  authorize,
  errorHandler,
  uploadTmp,
  validateRequest,
  AlreadyExistError,
  NotAllowError,
  NotFoundError,
  ResponseError,
};
