const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.err(err);
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  });

  next();
};

module.exports = errorHandler;
