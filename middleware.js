const authorize = require('./lib/middleware/authorize');
const error = require('./lib/middleware/error');
const uploadTmp = require('./lib/middleware/upload-tmp');
const validateRequest = require('./lib/middleware/validate-request');

module.exports = {
  authorize, error, uploadTmp, validateRequest,
};
