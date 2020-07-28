import produce from 'immer';
import { deleteCookies, getCookie, getUserCookie } from 'helpers/cookieHelper';
import { fullStoryIdentify } from 'helpers/fullStoryHelper';

import types from './constants';

export const initialState = {
  user: false,
  token: false,
  loading: false,
  error: false,
  loginEmail: false,
  zipCode: false,
  crewPreview: false,
  crewCount: 0,
  crew: false,
  leaderbaord: false,
  ranking: false,
};

const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.REGISTER:
      case types.SOCIAL_REGISTER:
        draft.user = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.REGISTER_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        draft.error = false;
        fullStoryIdentify(action.user);
        break;

      case types.REGISTER_ERROR:
        draft.user = false;
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.CONFIRM_EMAIL:
        draft.loading = true;
        draft.error = false;
        break;

      case types.CONFIRM_EMAIL_SUCCESS:
        draft.user = action.user;
        draft.zipCode = action.user.zipCode;
        draft.token = action.token;
        draft.loading = false;
        draft.error = false;
        fullStoryIdentify(action.user);
        break;

      case types.CONFIRM_EMAIL_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.LOAD_USER_FROM_COOKIE:
        let user = getUserCookie();
        let token = getCookie('token');
        if (user) {
          draft.user = JSON.parse(user);
        }
        if (token) {
          draft.token = token;
        }
        break;

      case types.SIGN_OUT:
        deleteCookies();
        draft.user = false;
        draft.token = false;
        window.location.replace(action.url);
        break;

      case types.LOGIN:
        draft.loginEmail = action.email;
        break;

      case types.SOCIAL_LOGIN:
        /* eslint-disable no-underscore-dangle */
        draft.loginEmail = action.user._profile.email;
        break;

      case types.UPLOAD_AVATAR:
        draft.loading = true;
        break;

      case types.UPDATE_USER_SUCCESS:
        draft.loading = false;
        draft.user = action.user;
        break;

      case types.CREW:
        draft.loading = true;
        break;

      case types.CREW_SUCCESS:
        draft.crew = action.crew;
        draft.loading = false;
        break;

      case types.CREW_PREVIEW_SUCCESS:
        draft.crewPreview = action.crewPreview;
        draft.crewCount = action.crewCount;
        draft.loading = false;
        break;

      case types.USER_RANKING_SUCCESS:
        draft.ranking = action.ranking;
        break;
    }
  });

export default userReducer;
