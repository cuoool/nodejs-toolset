const { authorization } = require('../authorization');

module.exports = (policy, ability, ...attributes) => async (req, res, next) => {
  try {
    const allowed = await authorization.validate(req.user, policy, ability, attributes);

    if (allowed) { return next(); }

    res.status(403).json({ message: 'Unauthorized request' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
