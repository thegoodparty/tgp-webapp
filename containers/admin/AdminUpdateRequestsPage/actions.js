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

export default {
  loadUgcsAction,
  loadUgcsActionSuccess,
};
