/*
 *
 * TwitterCallbackPage actions
 *
 */

import types from './constants';

const confirmTwitterCallbackAction = (oauthToken, oauthVerifier) => ({
  type: types.CONFIRM_TWITTER_CALLBACK,
  oauthToken,
  oauthVerifier,
});

export default {
  confirmTwitterCallbackAction,
};
