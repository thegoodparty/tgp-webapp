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

const confirmEmailAction = (email, token, fromLogin = false) => ({
  type: types.CONFIRM_EMAIL,
  email,
  token,
  fromLogin,
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

const signoutAction = (url = '/') => ({
  type: types.SIGN_OUT,
  url,
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

const saveUserRankingAction = (candidate, rank, chamber, refreshUserCount) => ({
  type: types.SAVE_USER_RANKING,
  candidate,
  rank,
  chamber,
  refreshUserCount,
});

const deleteUserRankingAction = () => ({
  type: types.DELETE_USER_RANKING,
});

const uploadAvatarAction = (fileName, fileData, withRedirect = true) => ({
  type: types.UPLOAD_AVATAR,
  fileName,
  fileData,
  withRedirect,
});

const generateUuidAction = () => ({
  type: types.GENERATE_UUID,
});

const crewAction = () => ({
  type: types.CREW,
});

const crewActionSuccess = crew => ({
  type: types.CREW_SUCCESS,
  crew,
});

const userRankingAction = () => ({
  type: types.USER_RANKING,
});

const userRankingActionSuccess = ranking => ({
  type: types.USER_RANKING_SUCCESS,
  ranking,
});

const userRankingActionError = error => ({
  type: types.USER_RANKING_ERROR,
  error,
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
  updateUserAction,
  updateUserActionSuccess,
  saveUserRankingAction,
  deleteUserRankingAction,
  uploadAvatarAction,
  generateUuidAction,
  crewAction,
  crewActionSuccess,
  userRankingAction,
  userRankingActionSuccess,
  userRankingActionError,
};
