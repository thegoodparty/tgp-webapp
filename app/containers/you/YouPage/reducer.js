import produce from 'immer';
import types from './constants';
import { deleteCookies, getCookie } from 'helpers/cookieHelper';

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
        break;

      case types.LOGIN:
        draft.loginEmail = action.email;
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
    }
  });

export default userReducer;
