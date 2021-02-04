const FtpClient = require('ftp');
const config = require('../../config');

class FtpDisk {
  #ftpClient = new FtpClient();

  constructor() {
    this.#ftpClient.connect({
      host: config.get('filesystem.disks.ftp.host') || 'localhost',
      port: config.get('filesystem.disks.ftp.port') || 21,
      user: config.get('filesystem.disks.ftp.user'),
      password: config.get('filesystem.disks.ftp.password'),
    });
  }

  write(filePath, content) {
    return new Promise((resolve, reject) => {
      const stripFilePath = filePath.replace(/\\/g, '/');
      const directories = stripFilePath.split('/');

      directories.pop();

      this.#ftpClient.mkdir(directories.join('/'), true, (errMkdir) => {
        if (errMkdir) return reject(errMkdir);

        this.#ftpClient.put(content, stripFilePath, (errPut) => {
          if (errPut) return reject(errPut);

          resolve();
        });
      });
    });
  }

  readStream(filePath) {
    return new Promise((resolve, reject) => {
      this.#ftpClient.get(filePath, (err, stream) => {
        if (err) return reject(err);

        resolve(stream);
      });
    });
  }
}

module.exports = FtpDisk;
