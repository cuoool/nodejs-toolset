const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(err.statusCode || 400).json({
    message: err.message || 'Something went wrong',
  });

  next();
};

module.exports = errorHandler;
