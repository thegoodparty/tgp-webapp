/*
 *
 * CandidatePortalHomePage actions
 *
 */

import types from './constants';

function findCandidate(id) {
  return {
    type: types.FIND_CANDIDATE,
    id,
  };
}

function findCandidateSuccess(candidate) {
  return {
    type: types.FIND_CANDIDATE_SUCCESS,
    candidate,
  };
}

function loadStatsAction(range, id) {
  return {
    type: types.LOAD_STATS,
    range,
    id,
  };
}

function loadStatsActionSuccess(stats) {
  return {
    type: types.LOAD_STATS_SUCCESS,
    stats,
  };
}

function loadRoleAction(id) {
  return {
    type: types.LOAD_ROLE,
    id,
  };
}

function loadRoleActionSuccess(role) {
  return {
    type: types.LOAD_ROLE_SUCCESS,
    role,
  };
}

function updatePreferencesAction(id, preferences) {
  return {
    type: types.UPDATE_PREFERENCES,
    id,
    preferences,
  };
}

function createUpdateAction(id, update) {
  return {
    type: types.CREATE_UPDATE,
    id,
    update,
  };
}

export default {
  findCandidate,
  findCandidateSuccess,

  loadStatsAction,
  loadStatsActionSuccess,

  loadRoleAction,
  loadRoleActionSuccess,

  updatePreferencesAction,

  createUpdateAction,
};
