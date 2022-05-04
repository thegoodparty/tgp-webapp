/*
 *
 * HomePage actions
 *
 */

import types from './constants';

function loadHomepageCandidatesAction() {
  return {
    type: types.LOAD_HOMEPAGE_CANDIDATES,
  };
}

function loadHomepageCandidatesActionSuccess(candidates) {
  return {
    type: types.LOAD_HOMEPAGE_CANDIDATES_SUCCESS,
    candidates,
  };
}

function loadHomepageCandidatesActionError(error) {
  return {
    type: types.LOAD_HOMEPAGE_CANDIDATES_ERROR,
    error,
  };
}

function subscribeEmailAction(email) {
  return {
    type: types.SUBSCRIBE_EMAIL,
    email,
  };
}

export default {
  loadHomepageCandidatesAction,
  loadHomepageCandidatesActionSuccess,
  loadHomepageCandidatesActionError,
  subscribeEmailAction,
};
