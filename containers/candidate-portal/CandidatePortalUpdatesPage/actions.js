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

export default {
  editUpdateAction,
};
