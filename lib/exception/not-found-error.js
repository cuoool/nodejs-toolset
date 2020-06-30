class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Not found');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
