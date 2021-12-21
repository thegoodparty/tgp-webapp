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

export default {
  createApplicationAction,

  loadApplicationsAction,
  loadApplicationsActionSuccess,
};
