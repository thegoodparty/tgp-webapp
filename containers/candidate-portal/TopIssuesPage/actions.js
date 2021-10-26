import types from './constants';

function findUgcAction() {
  return {
    type: types.FIND_UGC,
  };
}

function findUgcActionSuccess(candidateUgc) {
  return {
    type: types.FIND_UGC_SUCCESS,
    candidateUgc,
  };
}

function updateUgcAction(ugc) {
  return {
    type: types.UPDATE_UGC,
    ugc,
  };
}

export default {
  findUgcAction,
  findUgcActionSuccess,
  updateUgcAction,
};
