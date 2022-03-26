import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from '/helpers/requestHelper';
import {
  deleteCookie,
  setCookie,
  setUserCookie,
  getSignupRedirectCookie,
  deleteSignupRedirectCookie,
} from '/helpers/cookieHelper';

import snackbarActions from '/containers/shared/SnackbarContainer/actions';

import tgpApi from '/api/tgpApi';
import { logEvent } from '/services/AnalyticsService';
import globalActions from '/containers/App/actions';

import types from './constants';
import actions from './actions';

function* login({ value, valueType }) {
  try {
    const api = tgpApi.loginStep1;
    const payload = {
      [valueType]: value,
    };
    const { hasPassword } = yield call(requestHelper, api, payload);
    setCookie('login-value', value);
    setCookie('login-value-type', valueType);
    if (hasPassword) {
      yield put(push('/login/password'));
    } else {
      yield put(push('/register/confirm'));
    }
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        `${value} is not in our system`,
        'error',
      ),
    );
  }
}

function* socialLogin({ user }) {
  try {
    /* eslint-disable no-underscore-dangle */
    const profile = user._profile;
    const provider = user._provider;
    const { email, profilePicURL } = profile;
    let socialPic = profilePicURL;
    let idToken;
    if (provider === 'facebook') {
      try {
        const largeImage = yield call(window.FB.api, '/me/picture?width=500');
        if (largeImage) {
          socialPic = largeImage;
        }
        idToken = user._token.accessToken;
      } catch (e) {
        console.log('fb API error');
      }
    } else if (provider === 'google') {
      // for gogole removing the "=s96-c" at the end of the string returns a large image.
      try {
        const largeImg = profilePicURL.substring(0, profilePicURL.indexOf('='));
        if (largeImg) {
          socialPic = largeImg;
        }
        ({ idToken } = user._token);
      } catch (e) {
        console.log('large image error');
      }
    }
    const api = tgpApi.socialLogin;
    const payload = {
      email,
      socialPic,
      socialProvider: provider,
      socialToken: idToken,
    };
    const response = yield call(requestHelper, api, payload);
    const accessToken = response.token;
    const responseUser = response.user;
    // yield put(actions.confirmEmailActionSuccess(responseUser, accessToken));
    const cookieRedirect = getSignupRedirectCookie();

    if (cookieRedirect) {
      yield put(push(cookieRedirect.route));
      deleteSignupRedirectCookie();
    } else {
      yield put(push('/'));
    }

    setUserCookie(responseUser);
    setCookie('token', accessToken);

    yield put(
      snackbarActions.showSnakbarAction(`Welcome back ${responseUser.name}`),
    );
  } catch (error) {
    if (error.response && error.response.noUser) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    } else {
      yield put(snackbarActions.showSnakbarAction('Error Signing in', 'error'));
    }
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.SOCIAL_LOGIN, socialLogin);
}
