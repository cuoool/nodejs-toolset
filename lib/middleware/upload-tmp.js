const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

function getFilename(req, file, cb) {
  crypto.randomBytes(16, (err, raw) => {
    cb(err, err ? undefined : raw.toString('hex'));
  });
}

function TmpDiskStorage() {
  this.getFilename = getFilename;
  this.destination = os.tmpdir();
}

TmpDiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getFilename(req, file, (err, filename) => {
    if (err) return cb(err);

    const finalPath = path.join(this.destination, filename).replace(/\\/g, '/');
    const outStream = fs.createWriteStream(finalPath);

    file.stream.pipe(outStream);
    outStream.on('error', cb);
    outStream.on('finish', () => {
      cb(null, {
        destination: this.destination,
        filename,
        path: finalPath,
        size: outStream.bytesWritten,
      });
    });
  });
};

TmpDiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  const filePath = file.path;

  /* eslint-disable no-param-reassign */
  delete file.destination;
  delete file.filename;
  delete file.path;
  /* eslint-enable no-param-reassign */

  fs.unlink(filePath, cb);
};

module.exports = multer({ storage: new TmpDiskStorage() });
