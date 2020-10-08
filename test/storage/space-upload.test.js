const path = require('path');
const { expect } = require('chai');
const config = require('../../lib/config');
const storage = require('../../lib/storage');

describe('Space storage', () => {
  beforeEach(() => {
    config.load({
      filesystem: {
        disks: {
          space: {
            driver: 's3',
            key: process.env.SPACE_KEY,
            secret: process.env.SPACE_SECRET,
            endpoint: process.env.SPACE_ENDPOINT,
            region: process.env.SPACE_REGION,
            bucket: process.env.SPACE_BUCKET,
            root: undefined,
            acl: process.env.SPACE_ACL,
          },
        },
      },
    });
  });
  it.skip('upload', async () => {
    const filePath = await storage({
      source: path.join(__dirname, '../assets/product-1.jpg'),
      destination: 'product',
      disk: 'space',
    }).store();

    expect(filePath).to.be.not.null;
  });
});
