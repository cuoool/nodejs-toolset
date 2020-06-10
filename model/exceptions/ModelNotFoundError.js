class ModelNotFoundError extends Error {
  constructor(message = 'Resource not found', statusCode = 422) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ModelNotFoundError';
  }
}

module.exports = ModelNotFoundError;
