import types from './constants';

const registerAction = (email, name, comments) => ({
  type: types.REGISTER,
  email,
  name,
  comments,
});

const registerActionSuccess = user => ({
  type: types.REGISTER_SUCCESS,
  user,
});

const registerActionError = error => ({
  type: types.REGISTER_ERROR,
  error,
});

const resendEmailAction = email => ({
  type: types.RESEND_EMAIL,
  email,
});

const confirmEmailAction = (email, token) => ({
  type: types.CONFIRM_EMAIL,
  email,
  token,
});

const confirmEmailActionSuccess = (user, token) => ({
  type: types.CONFIRM_EMAIL_SUCCESS,
  user,
  token,
});

const confirmEmailActionError = error => ({
  type: types.CONFIRM_EMAIL_ERROR,
  error,
});

const loadUserFromCookieAction = () => ({
  type: types.LOAD_USER_FROM_COOKIE,
});

export default {
  registerAction,
  registerActionSuccess,
  registerActionError,
  resendEmailAction,
  confirmEmailAction,
  confirmEmailActionSuccess,
  confirmEmailActionError,
  loadUserFromCookieAction,
};
