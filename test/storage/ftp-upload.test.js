const path = require('path');
const { expect } = require('chai');
const config = require('../../lib/config');
const storage = require('../../lib/storage');

describe('Ftp storage', () => {
  beforeEach(() => {
    config.load({
      filesystem: {
        disks: {
          ftp: {
            host: 'localhost',
            port: 21,
            user: 'ftpuser',
            password: 'secret',
          },
        },
      },
    });
  });

  it.only('upload', async () => {
    const filePath = await storage({
      source: path.join(__dirname, '../assets/product-1.jpg'),
      destination: 'product',
      disk: 'ftp',
    }).store();

    expect(filePath).to.be.not.null;
  });
});
