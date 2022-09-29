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

export default {
  loadCandidatesAction,
  loadCandidatesActionSuccess,
};
