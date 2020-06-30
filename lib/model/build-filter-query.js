const _ = require('lodash');

const buildFilterQuery = (filter) => _.reduce(filter, (result, value, key) => {
  if (value === 'null') {
    return { ...result, ...{ [key]: null } };
  }

  return { ...result, ...{ [key]: value } };
}, {});

module.exports = buildFilterQuery;
