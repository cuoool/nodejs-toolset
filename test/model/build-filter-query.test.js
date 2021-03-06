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

  it('use callback', () => {
    const filter = { event: 'EventName', fromDate: '2020-01-01', toDate: '2020-10-03' };

    const result = buildQueryFilter(filter, (prop) => ([
      'event',
      {
        createdAt: {
          [Op.gte]: prop.fromDate,
          [Op.lte]: prop.toDate,
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

  it('remove `undefined` key pair', () => {
    const filter = { f1: undefined, f2: 'something' };

    const result = buildQueryFilter(filter, () => (['f1', 'f2']));

    expect(result).to.deep.equal({ f2: 'something' });
  });

  it('return empty object if `filter` is undefined', () => {
    const filter = undefined;

    const result = buildQueryFilter(filter, () => (['f1', 'f2']));

    expect(result).to.deep.equal({});
  });

  it('return empty object if `filter` is null', () => {
    const filter = null;

    const result = buildQueryFilter(filter, () => (['f1', 'f2']));

    expect(result).to.deep.equal({});
  });

  it('return empty object if `filter` is string', () => {
    const filter = 'something';

    const result = buildQueryFilter(filter, () => (['f1', 'f2']));

    expect(result).to.deep.equal({});
  });

  it('return empty object if `filter` is number', () => {
    const filter = 899;

    const result = buildQueryFilter(filter, () => (['f1', 'f2']));

    expect(result).to.deep.equal({});
  });

  it('return empty object if `filter` is array', () => {
    const filter = [];

    const result = buildQueryFilter(filter, () => (['f1', 'f2']));

    expect(result).to.deep.equal({});
  });

  it('remove empty attribute object', () => {
    const result1 = buildQueryFilter({ f1: 'something' }, () => ([
      'f1',
      {
        f2: {},
      },
    ]));

    expect(result1).to.deep.equal({ f1: 'something' });
  });
});
