import types from './constants';

function loadIssueTopicsAction() {
  return {
    type: types.LOAD_ISSUE_TOPICS,
  };
}

function loadIssueTopicsActionSuccess(topics) {
  return {
    type: types.LOAD_ISSUE_TOPICS_SUCCESS,
    topics,
  };
}

export default {
  loadIssueTopicsAction,
  loadIssueTopicsActionSuccess,
};
