import types from './constants';

function findUgcAction(id) {
  return {
    type: types.FIND_UGC,
    id,
  };
}

function findUgcActionSuccess(candidateUgc) {
  return {
    type: types.FIND_UGC_SUCCESS,
    candidateUgc,
  };
}

function updateUgcAction(id, ugc) {
  return {
    type: types.UPDATE_UGC,
    id,
    ugc,
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
  findUgcAction,
  findUgcActionSuccess,
  updateUgcAction,

  saveImageAction,
  saveImageActionSuccess,
};
