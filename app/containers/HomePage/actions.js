/*
 *
 * HomePage actions
 *
 */

import types from './constants';

function loadChallengersAction() {
  return {
    type: types.LOAD_CHALLENGERS,
  };
}

function loadChallengersActionSuccess(challengers) {
  return {
    type: types.LOAD_CHALLENGERS_SUCCESS,
    challengers,
  };
}

function loadChallengersActionError(error) {
  return {
    type: types.LOAD_CHALLENGERS_ERROR,
    error,
  };
}

function subscribeEmailAction(email) {
  return {
    type: types.SUBSCRIBE_EMAIL,
    email,
  }
}

export default {
	loadChallengersAction,
	loadChallengersActionSuccess,
	loadChallengersActionError,
  subscribeEmailAction
};