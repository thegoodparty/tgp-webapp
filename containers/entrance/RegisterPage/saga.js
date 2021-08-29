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

import types from './constants';
import actions from './actions';

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

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.REGISTER, register);
}
