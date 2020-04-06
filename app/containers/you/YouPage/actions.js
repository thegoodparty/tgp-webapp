import types from './constants';

const registerAction = (email, name) => ({
  type: types.REGISTER,
  email,
  name,
});

const registerActionSuccess = user => ({
  type: types.REGISTER_SUCCESS,
  user,
});

const registerActionError = error => ({
  type: types.REGISTER_ERROR,
  error,
});

const socialRegisterAction = user => ({
  type: types.SOCIAL_REGISTER,
  user,
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

const signoutAction = () => ({
  type: types.SIGN_OUT,
});

const loginAction = email => ({
  type: types.LOGIN,
  email,
});

const socialLoginAction = user => ({
  type: types.SOCIAL_LOGIN,
  user,
});

const updatePresidentialRankAction = rank => ({
  type: types.UPDATE_PRESIDENTIAL_RANK,
  rank,
});

const updateSenateRankAction = (rank, state) => ({
  type: types.UPDATE_SENATE_RANK,
  rank,
  state,
});

const updateHouseRankAction = (rank, state, district) => ({
  type: types.UPDATE_HOUSE_RANK,
  rank,
  state,
  district,
});

const updateUserAction = updatedFields => ({
  type: types.UPDATE_USER,
  updatedFields,
});

const updateUserActionSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user,
});

const saveUserRankingAction = (ranking, chamber, state, district) => ({
  type: types.SAVE_USER_RANKING,
  ranking,
  chamber,
  state,
  district,
});

const uploadAvatarAction = (fileName, fileData) => ({
  type: types.UPLOAD_AVATAR,
  fileName,
  fileData,
});

export default {
  registerAction,
  registerActionSuccess,
  registerActionError,
  socialRegisterAction,
  resendEmailAction,
  confirmEmailAction,
  confirmEmailActionSuccess,
  confirmEmailActionError,
  loadUserFromCookieAction,
  signoutAction,
  loginAction,
  socialLoginAction,
  updatePresidentialRankAction,
  updateSenateRankAction,
  updateHouseRankAction,
  updateUserAction,
  updateUserActionSuccess,
  saveUserRankingAction,
  uploadAvatarAction,
};
