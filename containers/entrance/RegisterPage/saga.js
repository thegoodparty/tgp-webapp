import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import { push } from 'connected-next-router';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import {
  deleteCookie,
  deleteSignupRedirectCookie,
  getCookie,
  getSignupRedirectCookie,
  setCookie,
  setUserCookie,
} from '/helpers/cookieHelper';

import { logEvent } from '/services/AnalyticsService';

import globalActions from '/containers/App/actions';

import types from './constants';
import actions from './actions';

function* register({ name, email, phone, zip, callback, source }) {
  try {
    const api = tgpApi.register;
    const payload = {
      name,
      email,
      phone,
      zip,
      source,
      uri: window.location.href,
    };

    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const { user, token } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    setCookie('token', token);
    logEvent('signup', 'homepage-modal-form');
    yield call(setupCrew);
    if (callback) {
      callback();
    }
    const redirectCookie = getSignupRedirectCookie();
    if (redirectCookie) {
      yield put(push(redirectCookie.route));
      deleteSignupRedirectCookie();
    } else {
      yield put(snackbarActions.showSnakbarAction('Thank you for signing up!'));
      const pathWithNoQuery = window.location.pathname.split('?')[0];
      yield put(push(pathWithNoQuery));
      //   yield put(push('/register/confirm'));
    }
    yield put(globalActions.refreshTokenAction());
  } catch (error) {
    if (error.response?.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
      yield put(push('/?login=true'));
    } else {
      console.log(error);
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    }
  }
}

function* setupCrew() {
  try {
    const api = tgpApi.createCrew;
    const payload = {};
    const referrer = getCookie('referrer');
    if (referrer) {
      payload.referrer = referrer;
    }
    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    yield call(requestHelper, api, payload);
    deleteCookie('guestRanking');
  } catch (error) {
    console.log('setupCrew error', error);
  }
}

function* socialRegister({ socialUser }) {
  try {
    /* eslint-disable no-underscore-dangle */
    const profile = socialUser._profile;
    const provider = socialUser._provider;
    const { name, email, id, profilePicURL } = profile;
    // for facebook - get a larger image
    let socialPic = profilePicURL;
    let idToken;
    if (provider === 'facebook') {
      try {
        const largeImage = yield call(window.FB.api, '/me/picture?width=500');
        if (largeImage) {
          socialPic = largeImage;
        }
        idToken = socialUser._token.accessToken;
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
        ({ idToken } = socialUser._token);
      } catch (e) {
        console.log('large image error');
      }
    }

    const payload = {
      socialId: id,
      socialProvider: provider,
      socialPic,
      name,
      email,
      socialToken: idToken,
      source: 'registerPage',
      uri: window.location.href,
    };

    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const api = tgpApi.register;
    const { user, token } = yield call(requestHelper, api, payload);

    setUserCookie(user);
    setCookie('token', token);
    logEvent('Signup', 'Complete Account Signup', provider);
    // yield put(push('/register/password-creation'));
    yield put(snackbarActions.showSnakbarAction('Thank you for signing up!'));
    const pathWithNoQuery = window.location.pathname.split('?')[0];
    yield put(push(pathWithNoQuery));
    yield call(setupCrew);
  } catch (error) {
    if (error.response?.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
      yield put(push('/?login=true'));
    } else {
      console.log('error social login', error);
      logEvent('social-register', 'error');
      yield put(snackbarActions.showSnakbarAction(`Error Signing in`, 'error'));
    }
  }
}

function* twitterLogin() {
  try {
    const api = tgpApi.twitterLogin;

    const { url } = yield call(requestHelper, api, null);
    window.location.href = url;
  } catch (error) {
    console.log('twitter login error', JSON.stringify(error));
    yield put(
      snackbarActions.showSnakbarAction('Twitter Login Error', 'error'),
    );
  }
}

function* verifyRecaptcha({ token }) {
  try {
    const api = tgpApi.verifyRecaptcha;
    const payload = {
      token,
    };

    const { score } = yield call(requestHelper, api, payload);
    yield put(actions.verifyRecaptchaActionSuccess(score));
  } catch (error) {
    console.log('verifyRecaptcha error', JSON.stringify(error));
    yield put(actions.verifyRecaptchaActionError());
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.SOCIAL_REGISTER, socialRegister);
  yield takeLatest(types.TWITTER_REGISTER, twitterLogin);
  yield takeLatest(types.VERIFY_RECAPTCHA, verifyRecaptcha);
}
