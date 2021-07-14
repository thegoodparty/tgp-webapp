import types from './constants';

function updateComparedCandidateAction(candidate) {
  return {
    type: types.UPDATE_COMPARED_CANDIDATES,
    candidate,
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
  updateComparedCandidateAction,
  loadTopicsAction,
  loadTopicsActionSuccess,
};
