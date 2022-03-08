/*
 *
 * ApplicationPage actions
 *
 */

import types from './constants';

function loadApplicationAction(id) {
  return {
    type: types.LOAD_APPLICATION,
    id,
  };
}

function loadApplicationActionSuccess(application, reviewMode) {
  return {
    type: types.LOAD_APPLICATION_SUCCESS,
    application,
    reviewMode,
  };
}

function updateApplicationAction(id, data) {
  return {
    type: types.UPDATE_APPLICATION,
    id,
    data,
  };
}

function submitApplicationAction(id) {
  return {
    type: types.SUBMIT_APPLICATION,
    id,
  };
}

function approveApplicationAction(id, feedback) {
  return {
    type: types.APPROVE_APPLICATION,
    id,
    feedback,
  };
}

function rejectApplicationAction(id, feedback) {
  return {
    type: types.REJECT_APPLICATION,
    id,
    feedback,
  };
}

function loadATopIssuesAction() {
  return {
    type: types.LOAD_TOP_ISSUES,
  };
}

function loadATopIssuesActionSuccess(issues) {
  return {
    type: types.LOAD_TOP_ISSUES_SUCCESS,
    issues,
  };
}

export default {
  loadApplicationAction,
  loadApplicationActionSuccess,

  updateApplicationAction,
  submitApplicationAction,

  approveApplicationAction,
  rejectApplicationAction,

  loadATopIssuesAction,
  loadATopIssuesActionSuccess,
};
