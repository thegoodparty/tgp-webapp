/*
 *
 * ApplicationPage actions
 *
 */

import types from './constants';

function loadApplicationAction(id) {
  return {
    type: types.LOAD_APPLICATION,
    id,
  };
}

function loadApplicationActionSuccess(application) {
  return {
    type: types.LOAD_APPLICATION_SUCCESS,
    application,
  };
}

function updateApplicationAction(id, data) {
  return {
    type: types.UPDATE_APPLICATION,
    id,
    data,
  };
}

export default {
  loadApplicationAction,
  loadApplicationActionSuccess,

  updateApplicationAction,
};
