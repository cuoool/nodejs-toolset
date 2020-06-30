const config = require('./lib/config');
const authorization = require('./lib/authorization');
const logger = require('./lib/logger');
const { BaseModel, ModelNotFoundError } = require('./lib/model');
const storage = require('./lib/storage');
const sms = require('./lib/transport/sms');
const middleware = require('./lib/middleware');

module.exports.middleware = middleware;
module.exports = {
  config,
  authorization,
  logger,
  BaseModel,
  ModelNotFoundError,
  storage,
  sms,
};
