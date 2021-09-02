import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { push } from 'connected-next-router';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import { setUserCookie } from 'helpers/cookieHelper';

import types from './constants';

function* confirmCode({ code }) {
  try {
    const api = tgpApi.confirmCode;
    const payload = {
      code,
    };

    const { user } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    yield put(push('/register/password-creation'));
    yield put(snackbarActions.showSnakbarAction('Your account is verified.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error verifying your code', 'error'),
    );
  }
}

function* resendCode() {
  try {
    const api = tgpApi.sendCode;

    yield call(requestHelper, api, null);
    yield put(snackbarActions.showSnakbarAction('New code sent.'));
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction('Error sending code', 'error'));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CONFIRM_CODE, confirmCode);
  yield takeLatest(types.RESEND_CODE, resendCode);
}
