import types from './constants';

function createUpdateAction(update, candidateId) {
  return {
    type: types.CREATE_UPDATE,
    update,
    candidateId,
  };
}

export default {
  createUpdateAction,
};
