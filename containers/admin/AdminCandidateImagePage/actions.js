import types from './constants';

function updateCandidateImageAction(candidate) {
  return {
    type: types.UPDATE_CANDIDATE_IMAGE,
    candidate,
  };
}

function loadCandidateActionSuccess(candidate) {
  return {
    type: types.LOAD_CANDIDATE_SUCCESS,
    candidate,
  };
}

export default {
  updateCandidateImageAction,
  loadCandidateActionSuccess,
};
