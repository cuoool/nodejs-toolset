const _ = require('lodash');
const { Op } = require('sequelize');

const buildFilterQuery = (filter) => _.reduce(filter, (result, value, key) => {
  if (value === '' || value === null) {
    return {
      ...result,
      ...{
        [Op.or]: [
          { [key]: null },
          { [key]: '' },
        ],
      },
    };
  }

  return { ...result, ...{ [key]: value } };
}, {});

module.exports = buildFilterQuery;
