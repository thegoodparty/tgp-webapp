import types from './constants';

function findCandidatePositionsAction(candidateId) {
  return {
    type: types.FIND_CANDIDATE_POSITIONS,
    candidateId,
  };
}

function findCandidatePositionsActionSuccess(candidatePositions) {
  return {
    type: types.FIND_CANDIDATE_POSITIONS_SUCCESS,
    candidatePositions,
  };
}

function loadTopIssuesAction() {
  return {
    type: types.LOAD_TOP_ISSUES,
  };
}

function loadTopIssueActionSuccess(topIssues) {
  return {
    type: types.LOAD_TOP_ISSUES_SUCCESS,
    topIssues,
  };
}

function saveCandidatePositionAction(
  topIssueId,
  positionId,
  description,
  candidateId,
  order,
) {
  return {
    type: types.SAVE_CANDIDATE_POSITION,
    topIssueId,
    positionId,
    description,
    candidateId,
    order,
  };
}

function updateCandidatePositionAction(
  id,
  topIssueId,
  positionId,
  description,
  candidateId,
) {
  return {
    type: types.UPDATE_CANDIDATE_POSITION,
    id,
    topIssueId,
    positionId,
    description,
    candidateId,
  };
}

function deleteCandidatePositionAction(id, candidateId) {
  return {
    type: types.DELETE_CANDIDATE_POSITION,
    id,
    candidateId,
  };
}

export default {
  findCandidatePositionsAction,
  findCandidatePositionsActionSuccess,

  saveCandidatePositionAction,
  updateCandidatePositionAction,
  deleteCandidatePositionAction,

  loadTopIssuesAction,
  loadTopIssueActionSuccess,
};
