/*
 *
 * HomePage actions
 *
 */

import types from './constants';

function loadChallengers() {
  return {
    type: types.LOAD_CHALLENGERS,
  };
}

function loadChallengersSuccess(challengers) {
  return {
    type: types.LOAD_CHALLENGERS_SUCCESS,
    challengers,
  };
}

function loadChallengersError(error) {
  return {
    type: types.LOAD_CHALLENGERS_ERROR,
    error,
  };
}

export default {
	loadChallengers,
	loadChallengersSuccess,
	loadChallengersError
};