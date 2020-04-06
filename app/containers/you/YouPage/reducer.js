import produce from 'immer';
import { deleteCookies, getCookie } from 'helpers/cookieHelper';

import types from './constants';

export const initialState = {
  user: false,
  token: false,
  loading: false,
  error: false,
  loginEmail: false,
  zipCode: false,
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
        break;

      case types.CONFIRM_EMAIL_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.LOAD_USER_FROM_COOKIE:
        let user = getCookie('user');
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
        window.location.replace('/');
        break;

      case types.LOGIN:
        draft.loginEmail = action.email;
        break;

      case types.SOCIAL_LOGIN:
        /* eslint-disable no-underscore-dangle */
        draft.loginEmail = action.user._profile.email;
        break;

      case types.UPDATE_PRESIDENTIAL_RANK:
        if (!state.user) {
          break;
        } else {
          const copyUser = JSON.parse(JSON.stringify(state.user)); // deep copy
          copyUser.presidentialRank = JSON.stringify(action.rank);
          draft.user = copyUser;
          break;
        }

      case types.UPDATE_SENATE_RANK:
        if (!state.user) {
          break;
        } else {
          const copyUser = JSON.parse(JSON.stringify(state.user)); // deep copy
          const senateState = action.state || '';
          const newRank = { [senateState]: action.rank || [] };
          copyUser.senateRank = JSON.stringify(newRank);
          draft.user = copyUser;
          break;
        }

      case types.UPDATE_HOUSE_RANK:
        if (!state.user) {
          break;
        } else {
          const copyUser = JSON.parse(JSON.stringify(state.user)); // deep copy
          const houseState = action.state || '';
          const district = action.district || '';
          const newRank2 = {
            [`${houseState}${district}`]: action.rank || [],
          };
          copyUser.houseRank = JSON.stringify(newRank2);
          draft.user = copyUser;
          break;
        }

      case types.UPLOAD_AVATAR:
        draft.loading = true;

      case types.UPDATE_USER_SUCCESS:
        draft.loading = false;
        draft.user = action.user;
        break;
    }
  });

export default userReducer;
