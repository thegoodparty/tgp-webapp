import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { push } from 'connected-next-router';
import tgpApi from 'api/tgpApi';
import candidateActions from 'containers/elections/CandidateNewPage/actions';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import {
  deleteCookie,
  getSignupRedirectCookie,
  getUserCookie,
  setCookie,
  setUserCookie,
} from 'helpers/cookieHelper';
import { formatToPhone } from 'helpers/phoneHelper';
import queryHelper from 'helpers/queryHelper';

import types from './constants';
import globalActions from '../../App/actions';
import actions from './actions';

function* confirmCode({ code, email }) {
  console.log('saga', code, email);
  try {
    const redirectCookie = getSignupRedirectCookie();
    if (redirectCookie) {
      yield put(candidateActions.supportAction(redirectCookie.options?.id));
    }

    let api;
    if (email) {
      api = tgpApi.confirmCodeLogin;
      deleteCookie('login-email');
    } else {
      api = tgpApi.confirmCode;
    }
    const payload = {
      code,
      email,
    };

    const { user, token } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    if (token) {
      setCookie('token', token);
    }
    const returnUrl = queryHelper(window.location.search, 'returnUrl');
    yield put(globalActions.refreshTokenAction());
    if (returnUrl) {
      yield put(push(returnUrl));
    } else {
      yield put(push('/register/password-creation'));
    }
    yield put(snackbarActions.showSnakbarAction('Your account is verified.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error verifying your code', 'error'),
    );
  }
}

function* resendCode({ withEmail }) {
  try {
    const api = tgpApi.sendCode;
    const payload = {
      withEmail,
    };
    yield call(requestHelper, api, payload);
    const user = getUserCookie(true);
    yield put(
      snackbarActions.showSnakbarAction(
        `New code sent to ${
          withEmail ? user.email : formatToPhone(user.phone)
        }`,
      ),
    );
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction('Error sending code', 'error'));
  }
}

function* updateUser({ updatedField }) {
  try {
    const api = tgpApi.updateUser;
    const payload = {
      [updatedField.field]: updatedField.newValue,
    };
    const { user } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    yield put(globalActions.refreshTokenAction());
    yield put(actions.resendCodeAction(updatedField.field === 'email'));
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction('Error sending code', 'error'));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CONFIRM_CODE, confirmCode);
  yield takeLatest(types.RESEND_CODE, resendCode);
  yield takeLatest(types.UPDATE_USER, updateUser);
}
