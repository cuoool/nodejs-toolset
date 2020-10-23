const _ = require('lodash');
const { Op } = require('sequelize');

function mapProps(filter, callback) {
  return _.reduce(callback(filter), (result, value) => {
    const prop = typeof value === 'string' ? { [value]: filter[value] } : value;

    return { ...result, ...prop };
  }, {});
}

function buildFilterQuery(filter, callback) {
  const props = callback === undefined ? filter : mapProps(filter, callback);

  return _.reduce(props, (result, value, key) => {
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
}

module.exports = buildFilterQuery;
