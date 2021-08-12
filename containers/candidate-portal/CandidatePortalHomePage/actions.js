/*
 *
 * CandidatePortalHomePage actions
 *
 */

import types from './constants';

function findCandidate() {
  return {
    type: types.FIND_CANDIDATE,
  };
}

function findCandidateSuccess(candidate) {
  return {
    type: types.FIND_CANDIDATE_SUCCESS,
    candidate,
  };
}

export default {
  findCandidate,
  findCandidateSuccess,
};
