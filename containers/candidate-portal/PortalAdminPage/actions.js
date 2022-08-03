/*
 *
 * PortalAdminPage actions
 *
 */

import types from './constants';

function updateCandidateAction(fields) {
  return {
    type: types.UPDATE_CANDIDATE,
    fields,
  };
}

function approveClaimAction(email, candidateId) {
  return {
    type: types.APPROVE_CLAIM,
    email,
    candidateId,
  };
}

export default {
  updateCandidateAction,
  approveClaimAction,
};
