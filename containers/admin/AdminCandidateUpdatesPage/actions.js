/*
 *
 * AdminCandidateUpdatesPage actions
 *
 */

import types from './constants';

function createUpdateAction(update, candidateId) {
  return {
    type: types.CREATE_UPDATE,
    update,
    candidateId,
  };
}

function saveUpdateAction(update, candidateId) {
  return {
    type: types.SAVE_UPDATE,
    update,
    candidateId,
  };
}

function deleteUpdateAction(updateId, candidateId) {
  return {
    type: types.DELETE_UPDATE,
    updateId,
    candidateId,
  };
}

export default {
  createUpdateAction,
  saveUpdateAction,
  deleteUpdateAction,
};
