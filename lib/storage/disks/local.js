const fs = require('fs').promises;
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('../../config');

class LocalDisk {
  async write(filePath, content) {
    const pathArr = filePath.replace(/\\/g, '/').split('/');
    const fileName = pathArr.pop();
    const fileDir = path.join(config.get('storagePath'), pathArr.join('/'));

    mkdirp.sync(fileDir);

    await fs.writeFile(path.join(fileDir, fileName), content);

    return true;
  }

  readStream(filePath) {
    return fs.createReadStream(path.join(config.get('storagePath'), filePath));
  }

  getUrl(filePath) {
    return `${config.get('appUrl')}/static/${path.join(filePath).replace(/\\/g, '/')}`;
  }
}

module.exports = LocalDisk;
