/*
 *
 * PortalEndorsementsPage actions
 *
 */

import types from './constants';

function addEndorsementAction(id, title, summary, link, image) {
  return {
    type: types.ADD_ENDORSEMENT,
    id,
    title,
    summary,
    link,
    image,
  };
}

function loadEndorsementAction(id) {
  return {
    type: types.LOAD_ENDORSEMENTS,
    id,
  };
}

function loadEndorsementActionSuccess(endorsements) {
  return {
    type: types.LOAD_ENDORSEMENTS_SUCCESS,
    endorsements,
  };
}

function deleteEndorsementAction(id, candidateId) {
  return {
    type: types.DELETE_ENDORSEMENT,
    id,
    candidateId,
  };
}

export default {
  addEndorsementAction,
  loadEndorsementAction,
  loadEndorsementActionSuccess,

  deleteEndorsementAction,
};
