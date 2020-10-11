const makePaging = ({ itemsPerPage, page } = {}) => ({
  offset: itemsPerPage ? ((+page || 1) - 1) * itemsPerPage : 0,
  limit: +itemsPerPage || 20,
});

module.exports = makePaging;
