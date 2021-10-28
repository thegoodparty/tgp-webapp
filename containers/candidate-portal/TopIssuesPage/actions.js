import types from './constants';

function findIssueAction() {
  return {
    type: types.FIND_ISSUE,
  };
}

function findIssueActionSuccess(candidateIssue) {
  return {
    type: types.FIND_ISSUE_SUCCESS,
    candidateIssue,
  };
}

function updateIssueAction(issue) {
  return {
    type: types.UPDATE_ISSUE,
    issue,
  };
}

export default {
  findIssueAction,
  findIssueActionSuccess,
  updateIssueAction,
};
