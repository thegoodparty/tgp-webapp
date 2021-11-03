/*
 *
 * AdminUpdateRequestsPage actions
 *
 */

import types from './constants';

function loadUgcsAction() {
  return {
    type: types.LOAD_UGC,
  };
}

function loadUgcsActionSuccess(ugc) {
  return {
    type: types.LOAD_UGC_SUCCESS,
    ugc,
  };
}

function acceptRequestAction(id) {
  return {
    type: types.ACCEPT_REQUEST,
    id,
  };
}

function rejectRequestAction(id) {
  return {
    type: types.REJECT_REQUEST,
    id,
  };
}

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
  loadUgcsAction,
  loadUgcsActionSuccess,
  loadTopIssuesAction,
  loadTopIssuesActionSuccess,

  acceptRequestAction,
  rejectRequestAction,
  acceptIssueRequestAction,
  rejectIssueRequestAction,
};
