const morgan = require('morgan');
const rfs = require('rotating-file-stream');

module.exports = (logPath, options = {}) => morgan('combined', {
  stream: rfs.createStream('access.log', {
    interval: '1d',
    path: logPath
  }),
  ...options
});
