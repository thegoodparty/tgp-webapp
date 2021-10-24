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

function loadStatsAction(range) {
  return {
    type: types.LOAD_STATS,
    range,
  };
}

function loadStatsActionSuccess(stats) {
  return {
    type: types.LOAD_STATS_SUCCESS,
    stats,
  };
}

export default {
  findCandidate,
  findCandidateSuccess,

  loadStatsAction,
  loadStatsActionSuccess,
};
