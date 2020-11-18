const _ = require('lodash');
const { Op } = require('sequelize');

function mapCallback(filter, callback) {
  if (typeof filter !== 'object' || Array.isArray(filter) || filter === null) return {};

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

    if (value === undefined) { return result; }

    return { ...result, ...{ [key]: value } };
  }, {});
}

module.exports = (filter, callback) => buildQuery(mapCallback(filter, callback));
