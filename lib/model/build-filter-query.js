const _ = require('lodash');
const { Op } = require('sequelize');

function checkEmptyObject(obj) {
  return typeof obj === 'object' && Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}

function mapCallback(filter, callback) {
  if (typeof filter !== 'object' || Array.isArray(filter) || filter === null) return {};

  return callback === undefined ? filter : _.reduce(callback(filter), (result, value) => {
    const prop = typeof value === 'string' ? { [value]: filter[value] } : value;

    return { ...result, ...prop };
  }, {});
}

function buildQuery(props) {
  return _.reduce(props, (accum, value, key) => {
    if (value === '' || value === null) {
      return {
        ...accum,
        ...{
          [Op.or]: [
            { [key]: null },
            { [key]: '' },
          ],
        },
      };
    }

    if (value === undefined || checkEmptyObject(value)) { return accum; }

    return { ...accum, ...{ [key]: value } };
  }, {});
}

module.exports = (filter, callback) => buildQuery(mapCallback(filter, callback));
