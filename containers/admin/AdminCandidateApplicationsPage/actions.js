/*
 *
 * AdminCandidateApplicationsPage actions
 *
 */

import types from './constants';

function loadApplicationsAction() {
  return {
    type: types.LOAD_APPLICATIONS,
  };
}
function loadApplicationsActionSuccess(applications) {
  return {
    type: types.LOAD_APPLICATIONS_SUCCESS,
    applications,
  };
}

export default {
  loadApplicationsAction,
  loadApplicationsActionSuccess,
};
