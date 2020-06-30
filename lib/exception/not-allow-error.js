class NotAllowError extends Error {
  constructor(message) {
    super(message || 'Not allow');
    this.statusCode = 403;
  }
}

module.exports = NotAllowError;
