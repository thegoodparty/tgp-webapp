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

const changePasswordAction = (password, oldPassword) => ({
  type: types.CHANGE_PASSWORD,
  password,
  oldPassword,
});

export default {
  updateUserAction,
  updateUserActionSuccess,

  changePasswordAction,
};
