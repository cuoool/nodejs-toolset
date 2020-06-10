const { isEmpty } = require('validator');
const Twilio = require('twilio');
const config = require('../../config');

const send = async ({ from, to, body } = {}) => {
  const isEmptyFrom = from === undefined || isEmpty(from);
  const isEmptyTo = to === undefined || isEmpty(to);
  const isEmptyBody = body === undefined || isEmpty(body);

  if (isEmptyFrom || isEmptyTo || isEmptyBody) {
    const err = [
      isEmptyFrom ? '`From`' : '',
      isEmptyTo ? '`To`' : '',
      isEmptyBody ? '`Body`' : '',
    ].join(', ');

    throw new Error(`${err} not provided`);
  }

  const twilio = Twilio(
    config.get('transportation.twilio.sid'),
    config.get('transportation.twilio.token'),
  );

  await twilio.messages.create({ body, from, to });
};

module.exports = { send };
