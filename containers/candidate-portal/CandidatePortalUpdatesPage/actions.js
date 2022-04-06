/*
 *
 * CandidatePortalUpdatesPage actions
 *
 */

import types from './constants';

function editUpdateAction(id, update) {
  return {
    type: types.EDIT_UPDATE,
    id,
    update,
  };
}

function deleteUpdateAction(id, candidateId) {
  return {
    type: types.DELETE_UPDATE,
    id,
    candidateId,
  };
}

export default {
  editUpdateAction,
  deleteUpdateAction,
};
