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

const saveUserRankingAction = (candidate, rank, chamber, state, district) => ({
  type: types.SAVE_USER_RANKING,
  candidate,
  rank,
  chamber,
  state,
  district,
});

const deleteAllUserRankingsAction = () => ({
  type: types.DELETE_ALL_USER_RANKINGS,
});

const deleteCandidateRankingAction = (id, chamber, state, district) => ({
  type: types.DELETE_CANDIDATE_RANKING,
  id,
  chamber,
  state,
  district,
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
};
