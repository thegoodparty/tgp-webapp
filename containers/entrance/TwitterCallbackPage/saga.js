import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from '/helpers/requestHelper';
import {
  getCookie,
  setCookie,
  setUserCookie,
  getSignupRedirectCookie,
  deleteSignupRedirectCookie,
  deleteCookie,
} from '/helpers/cookieHelper';

import snackbarActions from '/containers/shared/SnackbarContainer/actions';

import tgpApi from '/api/tgpApi';
import { logEvent } from '/services/AnalyticsService';

import types from './constants';

function* confirmTwitterCallback({ oauthToken, oauthVerifier }) {
  try {
    const api = tgpApi.confirmTwitterCallback;

    const payload = {
      oauthToken,
      oauthVerifier,
    };
    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const followCookie = getCookie('twitter-follow');
    if (followCookie) {
      payload.candidateFollow = parseInt(followCookie, 10);
    }

    const { user, token } = yield call(requestHelper, api, payload);
    if (followCookie) {
      yield put(push('/candidates'));
      yield put(
        snackbarActions.showSnakbarAction(
          'Thank you for supporting indie candidates!',
        ),
      );
      let followed = getCookie('twitter-followed');
      if (followed) {
        followed = JSON.parse(followed);
      } else {
        followed = [];
      }
      followed.push(followCookie); // the candidate id
      setCookie('twitter-followed', JSON.stringify(followed), 365);
      deleteCookie('twitter-follow');
    } else {
      setUserCookie(user);
      setCookie('token', token);
      if (user.zip && user.hasPassword) {
        yield put(push('/'));
      } else if (!user.hasPassword) {
        yield put(push('/register/password-creation'));
        yield call(setupCrew);
      } else {
        yield put(push('/register/set-zipcode'));
      }
    }
  } catch (error) {
    if (error.response?.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
      yield put(push('/login'));
    } else {
      console.log('error social login', error);
      logEvent('twitter-register', 'error');
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

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CONFIRM_TWITTER_CALLBACK, confirmTwitterCallback);
}
