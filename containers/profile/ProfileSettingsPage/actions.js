/*
 *
 * ProfileSettingsPage actions
 *
 */

import types from './constants';

const updateUserAction = updatedFields => ({
  type: types.UPDATE_USER,
  updatedFields,
});

const updateUserActionSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user,
});

export default {
  updateUserAction,
  updateUserActionSuccess,
};
