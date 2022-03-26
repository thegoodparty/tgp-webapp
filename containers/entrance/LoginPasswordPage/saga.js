import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from '/helpers/requestHelper';
import {
  deleteCookie,
  setCookie,
  setUserCookie,
} from '/helpers/cookieHelper';

import snackbarActions from '/containers/shared/SnackbarContainer/actions';

import tgpApi from '/api/tgpApi';

import types from './constants';

function* login({ value, password, valueType }) {
  try {
    const api = tgpApi.login;
    const payload = {
      [valueType]: value,
      password,
    };
    const { user, token } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    setCookie('token', token);
    deleteCookie('login-value');
    deleteCookie('login-value-type');
    if (user.zip) {
      if (user.candidate) {
        yield put(push('/candidate-portal'));
      } else {
        yield put(push('/'));
      }
    } else {
      yield put(push('/register/set-zipcode'));
    }
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        `Your password is not matching for ${value}`,
        'error',
      ),
    );
  }
}
function* forgotPassword({ value, valueType }) {
  try {
    const api = tgpApi.forgotPassword;
    const payload = {
      [valueType]: value,
    };
    yield call(requestHelper, api, payload);
    snackbarActions.showSnakbarAction(
      `Your password recovery link was sent to ${value}`,
    );
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        `Error sending password recovery to ${email}`,
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.FORGOT_PASSWORD, forgotPassword);
}
