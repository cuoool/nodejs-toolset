const { expect } = require('chai');
const rewire = require('rewire');

const config = rewire('../src/config');

describe('Load config', () => {
  it('Should store cofig data in local variable', () => {
    const configData = {
      appUrl: 'app.com',
      jwt: {
        secret: '123',
        salt: 10,
      },
    };

    config.load(configData);

    expect(config.__get__('configVariable')).to.deep.equal(configData);
  });

  it('Get a specific config property value', () => {
    const configData = {
      appUrl: 'app.com',
      jwt: {
        secret: '123',
        salt: 10,
      },
    };

    config.load(configData);

    expect(config.get('jwt.secret')).to.equal('123');
  });

  it('Stop reading object properties if undefined', () => {
    expect(config.get('filesystem.disks.space')).to.be.undefined;
  });
});
