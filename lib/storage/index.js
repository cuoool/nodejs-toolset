const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const crypto = require('crypto');
// const mime = require('mime-types');
const FileType = require('file-type');
const config = require('../config');
const LocalDisk = require('./disks/local');
const SpaceDisk = require('./disks/space');
const FtpDisk = require('./disks/ftp');

const randomBytesAsync = util.promisify(crypto.randomBytes);

function getDiskInstance(diskName) {
  const disk = diskName || config.get('filesystem.default');

  if (disk === 'local') {
    return new LocalDisk();
  }

  if (disk === 'space') {
    return new SpaceDisk();
  }

  if (disk === 'ftp') {
    return new FtpDisk();
  }

  throw new Error('Disk driver doesn\'t exist');
}

const storage = ({
  disk, source, destination = '', ...options
} = {}) => {
  const diskInstance = getDiskInstance(disk);

  async function store() {
    const content = await fs.readFile(source);
    const fileName = (await randomBytesAsync(16)).toString('hex');
    const { ext, mime } = await FileType.fromFile(source);
    const fullPath = path.join(
      destination,
      ext !== '' ? `${fileName}.${ext}` : fileName,
    );

    await diskInstance.write(
      fullPath,
      content,
      {
        metadata: { ContentType: mime },
        ...options,
      },
    );

    return fullPath.replace(/\\/g, '/');
  }

  function readStream(filePath) {
    return diskInstance.readStream(filePath);
  }

  function getUrl(filePath) {
    return diskInstance.getUrl(filePath);
  }

  return { store, readStream, getUrl };
};

module.exports = storage;
