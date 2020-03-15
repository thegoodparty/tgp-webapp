/*
 *
 * AmaContainer actions
 *
 */

import types from './constants';

const sendAma = message => {
  return {
    type: types.SEND_AMA,
    message,
  };
};

export default {
  sendAma,
};
