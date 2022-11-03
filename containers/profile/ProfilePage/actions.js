/*
 *
 * ProfilePage actions
 *
 */

import types from './constants';

function loadCandidatesAction() {
  return {
    type: types.LOAD_CANDIDATES,
  };
}

function loadCandidatesActionSuccess(candidates) {
  return {
    type: types.LOAD_CANDIDATES_SUCCESS,
    candidates,
  };
}

function loadCandidatesActionError() {
  return {
    type: types.LOAD_CANDIDATES_ERROR,
  };
}

export default {
  loadCandidatesAction,
  loadCandidatesActionSuccess,
  loadCandidatesActionError,
};
