const authoration = require('./authorization');
const logger = require('./logger');
const model = require('./model');
const storage = require('./storage');
const sms = require('./transport/sms');

module.exports = {
  authoration,
  logger,
  model,
  storage,
  sms,
};
