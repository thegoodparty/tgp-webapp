import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { push } from 'connected-next-router';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import {
  deleteCookie,
  getCookie,
  setCookie,
  setUserCookie,
} from 'helpers/cookieHelper';

import { logEvent } from 'services/AnalyticsService';

import types from './constants';

function* register({ name, email, phone, zip }) {
  try {
    const api = tgpApi.register;
    const payload = {
      name,
      email,
      phone,
      zip,
    };

    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const { user, token } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    setCookie('token', token);
    yield call(setupCrew);
    yield put(push('/register/confirm'));
  } catch (error) {
    if (error.response?.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
      yield put(push('/login'));
    } else {
      console.log(error);
      yield put(snackbarActions.showSnakbarAction(`Error Signing in`, 'error'));
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
    console.log('socialRegister Saga1', socialUser);
    const profile = socialUser._profile;
    const provider = socialUser._provider;
    const { name, email, id, profilePicURL } = profile;
    console.log('socialRegister Saga2', name, email);
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
    };

    console.log('socialRegister Saga3', payload);

    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const api = tgpApi.register;
    const { user, token } = yield call(requestHelper, api, payload);

    console.log('socialRegister Saga4', user);

    setUserCookie(user);
    setCookie('token', token);
    logEvent('Signup', 'Complete Account Signup', provider);
    console.log('socialRegister Saga5');
    yield put(push('/register/update'));
    console.log('socialRegister Saga6');
    yield call(setupCrew);
    console.log('socialRegister Saga7');
  } catch (error) {
    if (error.response?.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
      yield put(push('/login'));
    } else {
      console.log('error social login', error);
      logEvent('social-register', 'error');
      yield put(snackbarActions.showSnakbarAction(`Error Signing in`, 'error'));
    }
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.SOCIAL_REGISTER, socialRegister);
}
