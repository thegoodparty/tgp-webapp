/*
 *
 * ProfilePage actions
 *
 */

import types from './constants';

const loadUserSupportedAction = () => ({
  type: types.LOAD_USER_SUPPORTED,
});

const loadUserSupportedActionSuccess = userSupported => ({
  type: types.LOAD_USER_SUPPORTED_SUCCESS,
  userSupported,
});

const loadUpdatesAction = () => ({
  type: types.LOAD_UPDATES,
});

const loadUpdatesActionSuccess = updates => ({
  type: types.LOAD_UPDATES_SUCCESS,
  updates,
});

export default {
  loadUserSupportedAction,
  loadUserSupportedActionSuccess,

  loadUpdatesAction,
  loadUpdatesActionSuccess,
};
