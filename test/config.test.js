const { expect } = require('chai');
const config = require('../src/config');

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

    expect(config.configVariable).to.deep.equal(configData);
  });
});
