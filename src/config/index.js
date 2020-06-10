const { cloneDeep } = require('lodash');

module.exports = {
  configVariable: {},
  load(data) {
    this.configVariable = cloneDeep(data);
  },
  get(str) {
    const strArray = str.split('.');
    let val = cloneDeep(this.configVariable);

    for (let i = 0; i < strArray.length; i += 1) {
      val = val[strArray[i]];
    }

    return val;
  },
};
