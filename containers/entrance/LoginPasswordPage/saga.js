import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from 'helpers/requestHelper';
import {
  deleteCookie,
  setCookie,
  setUserCookie,
  getSignupRedirectCookie,
  deleteSignupRedirectCookie,
} from 'helpers/cookieHelper';

import snackbarActions from 'containers/shared/SnackbarContainer/actions';

import tgpApi from 'api/tgpApi';
import { logEvent } from 'services/AnalyticsService';
import globalActions from 'containers/App/actions';

import types from './constants';
import actions from './actions';

function* login({ email, password }) {
  try {
    const api = tgpApi.login;
    const payload = {
      email,
      password,
    };
    const { user, token } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    setCookie('token', token);
    deleteCookie('login-email');
    if (user.zip) {
      if (user.candidate) {
        yield put(push('/candidate-portal'));
      } else {
        yield put(push('/profile'));
      }
    } else {
      yield put(push('/register/set-zipcode'));
    }
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        `Your password is not matching for ${email}`,
        'error',
      ),
    );
  }
}
function* forgotPassword({ email }) {
  try {
    const api = tgpApi.forgotPassword;
    const payload = {
      email,
    };
    yield call(requestHelper, api, payload);
    snackbarActions.showSnakbarAction(
      `Your password recovery email was sent to ${email}`,
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
