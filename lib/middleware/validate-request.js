const { validationResult } = require('express-validator');
const { groupBy, transform, map } = require('lodash');

module.exports = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(422).json({
    errors: transform(
      groupBy(errors.array(), (er) => er.param),
      (result, value, key) => {
        // eslint-disable-next-line no-param-reassign
        result[key] = map(value, (v) => v.msg);
      },
      {},
    ),
  });
};
