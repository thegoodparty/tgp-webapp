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

function subscribeEmailAction(email, name) {
  return {
    type: types.SUBSCRIBE_EMAIL,
    email,
    name,
  };
}

function loadFeedAction() {
  return {
    type: types.LOAD_FEED,
  };
}

function loadFeedActionSuccess(fullFeed) {
  return {
    type: types.LOAD_FEED_SUCCESS,
    fullFeed,
  };
}

export default {
  loadHomepageCandidatesAction,
  loadHomepageCandidatesActionSuccess,
  loadHomepageCandidatesActionError,
  subscribeEmailAction,

  loadFeedAction,
  loadFeedActionSuccess,
};
