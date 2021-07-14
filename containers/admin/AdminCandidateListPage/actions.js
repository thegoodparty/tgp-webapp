/*
 *
 * AdminPage actions
 *
 */

import types from './constants';

function loadCandidates(chamber) {
  return {
    type: types.LOAD_CANDIDATES,
    chamber,
  };
}

function loadCandidatesSuccess(candidates) {
  return {
    type: types.LOAD_CANDIDATES_SUCCESS,
    candidates,
  };
}

function loadCandidatesError(error) {
  return {
    type: types.LOAD_CANDIDATES_ERROR,
    error,
  };
}

function deleteCandidateAction(id) {
  return {
    type: types.DELETE_CANDIDATE,
    id,
  };
}

export default {
  loadCandidates,
  loadCandidatesSuccess,
  loadCandidatesError,

  deleteCandidateAction,
};
