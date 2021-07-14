import types from './constants';

function createTopicAction(name, description) {
  return {
    type: types.CREATE_TOPIC,
    name,
    description,
  };
}

function editTopicAction(topic) {
  return {
    type: types.EDIT_TOPIC,
    topic,
  };
}

function deleteTopicAction(id) {
  return {
    type: types.DELETE_TOPIC,
    id,
  };
}

function loadTopicsAction() {
  return {
    type: types.LOAD_TOPICS,
  };
}

function loadTopicsActionSuccess(topics) {
  return {
    type: types.LOAD_TOPICS_SUCCESS,
    topics,
  };
}

export default {
  createTopicAction,
  editTopicAction,
  deleteTopicAction,
  loadTopicsAction,
  loadTopicsActionSuccess,
};
