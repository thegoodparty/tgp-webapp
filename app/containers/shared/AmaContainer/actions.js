/*
 *
 * AmaContainer actions
 *
 */

import types from './constants';

const sendAma = (message, replyEmail) => {
  return {
    type: types.SEND_AMA,
    message,
    replyEmail,
  };
};

export default {
  sendAma,
};
