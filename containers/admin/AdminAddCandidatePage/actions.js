/*
 *
 * AdminAddCandidatePage actions
 *
 */

import types from './constants';

function createCandidateAction(candidate) {
  return {
    type: types.CREATE_CANDIDATE,
    candidate,
  };
}

function editCandidateAction(candidate) {
  return {
    type: types.EDIT_CANDIDATE,
    candidate,
  };
}

export default {
  createCandidateAction,
  editCandidateAction,
};
