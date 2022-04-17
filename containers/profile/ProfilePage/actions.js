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

export default {
  loadUserSupportedAction,
  loadUserSupportedActionSuccess,
};
