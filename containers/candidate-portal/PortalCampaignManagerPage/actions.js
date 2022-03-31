import types from './constants';

function updateCandidateAction(id, candidate) {
  return {
    type: types.UPDATE_CANDIDATE,
    id,
    candidate,
  };
}

function saveImageAction(id, url) {
  return {
    type: types.SAVE_IMAGE,
    id,
    url,
  };
}

function saveImageActionSuccess(s3Url) {
  return {
    type: types.SAVE_IMAGE_SUCCESS,
    s3Url,
  };
}

export default {
  updateCandidateAction,
  saveImageAction,
  saveImageActionSuccess,
};
