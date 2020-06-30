const { cloneDeep } = require('lodash');

let configVariable;

module.exports = {
  load(data) {
    configVariable = cloneDeep(data);
  },
  get(str) {
    const strArray = str.split('.');
    let val = cloneDeep(configVariable);

    for (let i = 0; i < strArray.length; i += 1) {
      if (val === undefined) { return undefined; }

      val = val[strArray[i]];
    }

    return val;
  },
};
