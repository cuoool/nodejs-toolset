const { authorization } = require('../authorization');

module.exports = (policy, ability) => async (req, res, next) => {
  try {
    const allowed = await authorization.validate(req.user, policy, ability);

    if (allowed) { return next(); }

    res.status(422).json({ message: 'Unauthorized request' });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
