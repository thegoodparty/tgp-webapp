import types from './constants';

function createTopicAction(name, description) {
  return {
    type: types.CREATE_TOPIC,
    name,
    description,
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
  loadTopicsAction,
  loadTopicsActionSuccess,
};
