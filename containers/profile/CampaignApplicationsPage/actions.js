/*
 *
 * CampaignApplicationsPage actions
 *
 */

import types from './constants';

function createApplicationAction() {
  return {
    type: types.CREATE_APPLICATION,
  };
}

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

function deleteApplicationAction(id) {
  return {
    type: types.DELETE_APPLICATION,
    id,
  };
}

export default {
  createApplicationAction,

  loadApplicationsAction,
  loadApplicationsActionSuccess,

  deleteApplicationAction,
};
