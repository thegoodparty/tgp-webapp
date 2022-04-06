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

export default {
  updateCandidateAction,
};
