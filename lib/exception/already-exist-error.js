class AlreadyExistError extends Error {
  constructor(message) {
    super(message || 'Resource already exist');
    this.statusCode = 422;
  }
}

module.exports = AlreadyExistError;
