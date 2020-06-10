const fs = require('fs').promises;
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('../../config');

function LocalDisk() {
  async function write(filePath, content) {
    const pathArr = filePath.replace(/\\/g, '/').split('/');
    const fileName = pathArr.pop();
    const fileDir = path.join(config.get('storagePath'), pathArr.join('/'));

    mkdirp.sync(fileDir);

    await fs.writeFile(path.join(fileDir, fileName), content);

    return true;
  }

  function readStream(filePath) {
    return fs.createReadStream(path.join(config.get('storagePath'), filePath));
  }

  function getUrl(filePath) {
    return `${config.get('appUrl')}/static/${path.join(filePath).replace(/\\/g, '/')}`;
  }

  return { write, readStream, getUrl };
}

module.exports = LocalDisk;
