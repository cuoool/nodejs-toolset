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
});
