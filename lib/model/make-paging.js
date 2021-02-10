const makePaging = ({ itemsPerPage, page } = {}) => {
  if (!page) {
    return { limit: 1000 };
  }

  return {
    offset: itemsPerPage ? ((+page || 1) - 1) * itemsPerPage : 0,
    limit: +itemsPerPage || 20,
  };
};

module.exports = makePaging;
