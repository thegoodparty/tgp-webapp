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

const uploadAvatarAction = imageBase64 => ({
  type: types.UPLOAD_AVATAR,
  imageBase64,
});

const deleteAccountAction = () => ({
  type: types.DELETE_ACCOUNT,
});

export default {
  updateUserAction,
  updateUserActionSuccess,

  changePasswordAction,
  uploadAvatarAction,

  deleteAccountAction,
};
