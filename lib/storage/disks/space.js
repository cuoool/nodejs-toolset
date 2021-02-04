const AWS = require('aws-sdk');
const { Duplex } = require('stream');
const config = require('../../config');

class SpaceDisk {
  #s3 = null;

  constructor() {
    this.#s3 = new AWS.S3({
      accessKeyId: config.get('filesystem.disks.space.key'),
      secretAccessKey: config.get('filesystem.disks.space.secret'),
      endpoint: config.get('filesystem.disks.space.endpoint'),
      region: config.get('filesystem.disks.space.region'),
    });
  }

  async write(filePath, content, { metadata } = {}) {
    await this.#s3
      .upload({
        Bucket: config.get('filesystem.disks.space.bucket'),
        Key: filePath,
        Body: content,
        ACL: config.get('filesystem.disks.space.acl') || 'public-read',
        ...metadata,
      })
      .promise();

    return true;
  }

  async readStream(filePath) {
    const imgResponse = await this.#s3
      .getObject({
        Bucket: config.get('filesystem.disks.space.bucket'),
        Key: filePath,
      })
      .promise();

    const stream = new Duplex();
    stream.push(imgResponse.Body);
    stream.push(null);

    return stream;
  }

  getUrl(filePath) {
    return `https://${config.get('filesystem.disks.space.endpoint')}/${filePath}`;
  }

  getSignedUrl(filePath) {
    const signedUrl = this.#s3.getSignedUrlPromise('getObject', {
      Bucket: config.get('filesystem.disks.space.bucket'),
      Key: filePath,
    });

    return signedUrl;
  }
}

module.exports = SpaceDisk;
