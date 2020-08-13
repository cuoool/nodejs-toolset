const UnauthorizedError = require('./unauthorized-error');

function validate(user, policy, ability, ...attributes) {
  if (!Object.prototype.hasOwnProperty.call(policy, ability) || typeof policy[ability] !== 'function') {
    throw new Error('Unknown policy\'s ability');
  }

  return policy[ability](user, ...attributes);
}

function deny(msg) {
  throw new UnauthorizedError(msg || 'Access denied');
}

module.exports = { validate, deny };
