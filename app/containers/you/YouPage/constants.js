const REGISTER = '@@tgp/user/REGISTER';
const REGISTER_SUCCESS = '@@tgp/user/REGISTER_SUCCESS';
const REGISTER_ERROR = '@@tgp/user/REGISTER_ERROR';

const SOCIAL_REGISTER = '@@tgp/user/SOCIAL_REGISTER';

const RESEND_EMAIL = '@@tgp/user/RESEND_EMAIL';

const CONFIRM_EMAIL = '@@tgp/user/CONFIRM_EMAIL';
const CONFIRM_EMAIL_SUCCESS = '@@tgp/user/CONFIRM_EMAIL_SUCCESS';
const CONFIRM_EMAIL_ERROR = '@@tgp/user/CONFIRM_EMAIL_ERROR';

const LOAD_USER_FROM_COOKIE = '@@tgp/user/LOAD_USER_FROM_COOKIE';

const SIGN_OUT = '@@tgp/user/SIGN_OUT';

const LOGIN = '@@tgp/user/LOGIN';
const SOCIAL_LOGIN = '@@tgp/user/SOCIAL_LOGIN';

const FORGOT_PASSWORD = '@@tgp/user/FORGOT_PASSWORD';
const RESET_PASSWORD = '@@tgp/creator/RESET_PASSWORD';
const CHANGE_PASSWORD = '@@tgp/creator/CHANGE_PASSWORD';
const ADD_PASSWORD = '@@tgp/creator/ADD_PASSWORD';

const SAVE_USER_RANKING = '@@tgp/user/SAVE_USER_RANKING';
const DELETE_ALL_USER_RANKINGS = '@@tgp/user/DELETE_ALL_USER_RANKINGS';
const DELETE_CANDIDATE_RANKING = '@@tgp/user/DELETE_CANDIDATE_RANKING';

const UPDATE_USER = '@@tgp/user/UPDATE_USER';
const UPDATE_USER_SUCCESS = '@@tgp/user/UPDATE_USER_SUCCESS';

const UPLOAD_AVATAR = '@@tgp/user/UPLOAD_AVATAR';

const GENERATE_UUID = '@@tgp/user/GENERATE_UUID';

const CREW = '@@tgp/user/CREW';
const CREW_SUCCESS = '@@tgp/user/CREW_SUCCESS';
const CREW_PREVIEW_SUCCESS = '@@tgp/user/CREW_PREVIEW_SUCCESS';

const LEADERBOARD = '@@tgp/user/LEADERBOARD';
const LEADERBOARD_SUCCESS = '@@tgp/user/LEADERBOARD_SUCCESS';

const USER_RANKING = '@@tgp/user/USER_RANKING';
const USER_RANKING_SUCCESS = '@@tgp/user/USER_RANKING_SUCCESS';

const GUEST_RANKING = '@@tgp/user/GUEST_RANKING';
const SAVE_GUEST_RANKING = '@@tgp/user/SAVE_GUEST_RANKING';
const DELETE_GUEST_RANKING = '@@tgp/user/DELETE_GUEST_RANKING';

const SEND_MESSAGE_TO_CREATOR = '@@tgp/user/sendMessageToCreator';

const TWITTER_LOGIN = '@@tgp/creator/TWITTER_LOGIN';

export default {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  SOCIAL_REGISTER,
  RESEND_EMAIL,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_ERROR,
  LOAD_USER_FROM_COOKIE,
  SIGN_OUT,
  LOGIN,
  SOCIAL_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  ADD_PASSWORD,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  SAVE_USER_RANKING,
  DELETE_ALL_USER_RANKINGS,
  DELETE_CANDIDATE_RANKING,
  UPLOAD_AVATAR,
  GENERATE_UUID,
  CREW,
  CREW_SUCCESS,
  CREW_PREVIEW_SUCCESS,
  LEADERBOARD,
  LEADERBOARD_SUCCESS,
  USER_RANKING,
  GUEST_RANKING,
  USER_RANKING_SUCCESS,
  SAVE_GUEST_RANKING,
  DELETE_GUEST_RANKING,
  SEND_MESSAGE_TO_CREATOR,
  TWITTER_LOGIN
};
