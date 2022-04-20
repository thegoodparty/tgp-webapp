/*
 *
 * AdminTopIssuesPage actions
 *
 */

import types from './constants';

function createTopIssueAction(name) {
  return {
    type: types.CREATE_TOP_ISSUE,
    name,
  };
}

function createPositionAction(name, topIssueId) {
  return {
    type: types.CREATE_POSITION,
    name,
    topIssueId,
  };
}

function deleteTopIssueAction(id) {
  return {
    type: types.DELETE_TOP_ISSUE,
    id,
  };
}

function deletePositionAction(id) {
  return {
    type: types.DELETE_POSITION,
    id,
  };
}

function editPositionAction(id, name) {
  return {
    type: types.EDIT_POSITION,
    id,
    name,
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

export default {
  createTopIssueAction,
  createPositionAction,

  deleteTopIssueAction,
  deletePositionAction,

  editPositionAction,

  loadTopIssuesAction,
  loadTopIssueActionSuccess,
};
