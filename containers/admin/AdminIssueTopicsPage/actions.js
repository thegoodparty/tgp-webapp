import types from './constants';

function createIssueTopicAction(topic, positions) {
  return {
    type: types.CREATE_ISSUE_TOPIC,
    topic,
    positions,
  };
}

function editIssueTopicAction(topic) {
  return {
    type: types.EDIT_ISSUE_TOPIC,
    topic,
  };
}

function deleteIssueTopicAction(id) {
  return {
    type: types.DELETE_ISSUE_TOPIC,
    id,
  };
}

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
  createIssueTopicAction,
  editIssueTopicAction,
  deleteIssueTopicAction,
  loadIssueTopicsAction,
  loadIssueTopicsActionSuccess,
};
