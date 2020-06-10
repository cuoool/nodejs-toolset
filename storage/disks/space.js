const AWS = require('aws-sdk');
const { Duplex } = require('stream');
const config = require('../../config');

const s3 = new AWS.S3({
  accessKeyId: config.get('filesystem.disks.space.key'),
  secretAccessKey: config.get('filesystem.disks.space.secret'),
  endpoint: config.get('filesystem.disks.space.endpoint'),
  region: config.get('filesystem.disks.space.region'),
});

function SpaceDisk() {
  async function write(filePath, content, { metadata } = {}) {
    await s3
      .upload({
        Bucket: config.get('filesystem.disks.space.bucket'),
        Key: filePath,
        Body: content,
        ...metadata,
      })
      .promise();

    return true;
  }

  async function readStream(filePath) {
    const imgResponse = await s3
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

  function getUrl(filePath) {
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: config.get('filesystem.disks.space.bucket'),
      Key: filePath,
    });

    return signedUrl;
  }

  return { write, readStream, getUrl };
}

module.exports = SpaceDisk;
