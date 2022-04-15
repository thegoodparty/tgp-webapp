/*
 *
 * ProfilePage actions
 *
 */

import types from './constants';

const loadUserSupportedAction = () => ({
  type: types.LOAD_USER_SUPPORTED,
});

const loadUserSupportedActionSuccess = (userSupported) => ({
  type: types.LOAD_USER_SUPPORTED_SUCCESS,
  userSupported,
});

const loadStaffAction = () => ({
  type: types.LOAD_STAFF,
});

const loadStaffActionSuccess = (staff) => ({
  type: types.LOAD_STAFF_SUCCESS,
  staff,
});

export default {
  loadUserSupportedAction,
  loadUserSupportedActionSuccess,

  loadStaffAction,
  loadStaffActionSuccess,
};
