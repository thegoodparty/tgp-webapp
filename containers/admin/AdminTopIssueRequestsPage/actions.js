/*
 *
 * AdminTopIssueRequestsPage actions
 *
 */

import types from './constants';

function loadTopIssuesAction() {
  return {
    type: types.LOAD_TOP_ISSUES,
  };
}

function loadTopIssuesActionSuccess(topIssues) {
  return {
    type: types.LOAD_TOP_ISSUES_SUCCESS,
    topIssues,
  };
}

function acceptIssueRequestAction(id) {
  return {
    type: types.ACCEPT_ISSUE_REQUEST,
    id,
  };
}

function rejectIssueRequestAction(id) {
  return {
    type: types.REJECT_ISSUE_REQUEST,
    id,
  };
}
export default {
  loadTopIssuesAction,
  loadTopIssuesActionSuccess,

  acceptIssueRequestAction,
  rejectIssueRequestAction,
};
