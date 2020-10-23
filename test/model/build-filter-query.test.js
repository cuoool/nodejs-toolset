const { expect } = require('chai');
const { Op } = require('sequelize');
const buildQueryFilter = require('../../lib/model/build-filter-query');

describe('Query filter', () => {
  it('Use Op.or operator to wrap around null or empty field', () => {
    const result1 = buildQueryFilter({ nullField: null, otherParam: 'text' });

    expect(result1).to.deep.equal({
      [Op.or]: [
        { nullField: null },
        { nullField: '' },
      ],
      otherParam: 'text',
    });

    const result2 = buildQueryFilter({ nullField: '', otherParam: 'text' });

    expect(result2).to.deep.equal({
      [Op.or]: [
        { nullField: null },
        { nullField: '' },
      ],
      otherParam: 'text',
    });
  });

  it.only('use callback', () => {
    const filter = { event: 'EventName', fromDate: '2020-01-01', toDate: '2020-10-03' };

    const result = buildQueryFilter(filter, (prop) => ([
      'event',
      {
        createdAt: {
          [Op.gte]: prop.fromDate,
          [Op.lte]: prop.fromDate,
        },
      },
    ]));

    expect(result).to.deep.equal({
      event: 'EventName',
      createdAt: {
        [Op.gte]: '2020-01-01',
        [Op.lte]: '2020-10-03',
      },
    });
  });
});
