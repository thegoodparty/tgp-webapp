/*
 *
 * AdminUpdateRequestsPage actions
 *
 */

import types from './constants';

function loadUgcsAction() {
  return {
    type: types.LOAD_UGC,
  };
}

function loadUgcsActionSuccess(ugc) {
  return {
    type: types.LOAD_UGC_SUCCESS,
    ugc,
  };
}

function acceptRequestAction(id) {
  return {
    type: types.ACCEPT_REQUEST,
    id,
  };
}

function rejectRequestAction(id) {
  return {
    type: types.REJECT_REQUEST,
    id,
  };
}

export default {
  loadUgcsAction,
  loadUgcsActionSuccess,
  acceptRequestAction,
  rejectRequestAction,
};
