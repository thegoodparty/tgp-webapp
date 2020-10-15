import types from './constants';

const registerAction = (email, name, password) => ({
  type: types.REGISTER,
  email,
  name,
  password,
});

const registerActionSuccess = (user, token) => ({
  type: types.REGISTER_SUCCESS,
  user,
  token,
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

const loginAction = (email, password) => ({
  type: types.LOGIN,
  email,
  password,
});

const forgotPasswordAction = email => ({
  type: types.FORGOT_PASSWORD,
  email,
});

const socialLoginAction = user => ({
  type: types.SOCIAL_LOGIN,
  user,
});

const updateUserAction = updatedFields => ({
  type: types.UPDATE_USER,
  updatedFields,
});

const updateUserActionSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user,
});

const saveUserRankingAction = (candidate, chamber, state) => ({
  type: types.SAVE_USER_RANKING,
  candidate,
  chamber,
  state,
});

const deleteAllUserRankingsAction = () => ({
  type: types.DELETE_ALL_USER_RANKINGS,
});

const deleteCandidateRankingAction = (id, candidate) => ({
  type: types.DELETE_CANDIDATE_RANKING,
  id,
  candidate,
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

const crewAction = preview => ({
  type: types.CREW,
  preview,
});

const crewActionSuccess = crew => ({
  type: types.CREW_SUCCESS,
  crew,
});

const crewPreviewActionSuccess = (crewPreview, crewCount) => ({
  type: types.CREW_PREVIEW_SUCCESS,
  crewPreview,
  crewCount,
});

const leaderboardAction = () => ({
  type: types.LEADERBOARD,
});

const leaderboardActionSuccess = leaderboard => ({
  type: types.LEADERBOARD_SUCCESS,
  leaderboard,
});

const userRankingAction = () => ({
  type: types.USER_RANKING,
});

const guestRankingAction = () => ({
  type: types.GUEST_RANKING,
});

const userRankingActionSuccess = ranking => ({
  type: types.USER_RANKING_SUCCESS,
  ranking,
});

const saveGuestRankingAction = (candidate, rank, chamber) => ({
  type: types.SAVE_GUEST_RANKING,
  candidate,
  rank,
  chamber,
});

const deleteGuestRankingAction = rankToDelete => ({
  type: types.DELETE_GUEST_RANKING,
  rankToDelete,
});

const sendMessageToCreator = messageInfo => ({
  type: types.SEND_MESSAGE_TO_CREATOR,
  messageInfo,
});

const resetPasswordAction = (email, password, token) => ({
  type: types.RESET_PASSWORD,
  email,
  password,
  token,
});

const changePasswordAction = (newPassword, oldPassword) => ({
  type: types.CHANGE_PASSWORD,
  newPassword,
  oldPassword,
});

const addPasswordAction = newPassword => ({
  type: types.ADD_PASSWORD,
  newPassword,
});

const twitterLoginAction = () => ({
  type: types.TWITTER_LOGIN,
});

const confirmTwitterCallbackAction = (oauthToken, oauthVerifier) => ({
  type: types.CONFIRM_TWITTER_CALLBACK,
  oauthToken,
  oauthVerifier,
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
  forgotPasswordAction,
  resetPasswordAction,
  changePasswordAction,
  addPasswordAction,
  socialLoginAction,
  updateUserAction,
  updateUserActionSuccess,
  saveUserRankingAction,
  deleteAllUserRankingsAction,
  deleteCandidateRankingAction,
  uploadAvatarAction,
  generateUuidAction,
  crewAction,
  crewActionSuccess,
  crewPreviewActionSuccess,
  leaderboardAction,
  leaderboardActionSuccess,
  userRankingAction,
  guestRankingAction,
  userRankingActionSuccess,
  saveGuestRankingAction,
  deleteGuestRankingAction,
  sendMessageToCreator,
  twitterLoginAction,
  confirmTwitterCallbackAction,
};
