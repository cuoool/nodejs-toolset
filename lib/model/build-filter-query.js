const _ = require('lodash');
const { Op } = require('sequelize');

function mapCallback(filter, callback) {
  return callback === undefined ? filter : _.reduce(callback(filter), (result, value) => {
    const prop = typeof value === 'string' ? { [value]: filter[value] } : value;

    return { ...result, ...prop };
  }, {});
}

function buildQuery(props) {
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

module.exports = (filter, callback) => buildQuery(mapCallback(filter, callback));
