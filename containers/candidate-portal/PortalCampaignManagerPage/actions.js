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

export default {
  findUgcAction,
  findUgcActionSuccess,
  updateUgcAction,
};
