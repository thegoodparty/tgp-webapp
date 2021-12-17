import types from './constants';

function findIssueAction(candidateId) {
  return {
    type: types.FIND_ISSUE,
    candidateId,
  };
}

function findIssueActionSuccess(candidateIssue) {
  return {
    type: types.FIND_ISSUE_SUCCESS,
    candidateIssue,
  };
}

function updateIssueAction(issue, candidateId) {
  return {
    type: types.UPDATE_ISSUE,
    issue,
    candidateId,
  };
}

export default {
  findIssueAction,
  findIssueActionSuccess,
  updateIssueAction,
};
