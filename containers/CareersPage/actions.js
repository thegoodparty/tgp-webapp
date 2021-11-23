/*
 *
 * CareersPage actions
 *
 */

import types from './constants';

function updateSignupAction(email, notifications) {
  return {
    type: types.UPDATES_SIGNUP,
    email,
    notifications,
  };
}

export default {
  updateSignupAction,
};
