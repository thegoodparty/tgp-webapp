/*
 *
 * FollowButtonContainer actions
 *
 */

import types from './constants';

function followCandidateAction(candidateId) {
  return {
    type: types.FOLLOW_CANDIDATE,
    candidateId,
  };
}

function loadUserFollowsAction() {
  return {
    type: types.LOAD_USER_FOLLOWS,
  };
}

function loadUserFollowsActionSuccess(supports) {
  return {
    type: types.LOAD_USER_FOLLOWS_SUCCESS,
    supports,
  };
}

export default {
  followCandidateAction,
  loadUserFollowsAction,
  loadUserFollowsActionSuccess,
};
