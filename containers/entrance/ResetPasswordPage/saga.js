import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from 'helpers/requestHelper';

import snackbarActions from 'containers/shared/SnackbarContainer/actions';

import tgpApi from 'api/tgpApi';

import types from './constants';

function* resetPassword({ email, phone, password, token }) {
  try {
    const api = tgpApi.resetPassword;
    const payload = {
      password,
      token,
    };
    if (email) {
      payload.email = email;
    } else {
      payload.phone = phone;
    }
    console.log('restPassword saga', api, payload);
    yield call(requestHelper, api, payload);
    yield put(push('/login'));
    yield put(
      snackbarActions.showSnakbarAction(`Your password has been reset`),
    );
  } catch (error) {
    console.log('error saga', error);
    if (error.response?.expired) {
      yield put(
        snackbarActions.showSnakbarAction(
          'Your token is either invalid or expired.',
          'error',
        ),
      );
      yield put(push('/login'));
    } else {
      yield put(
        snackbarActions.showSnakbarAction(
          'Error resetting your password.',
          'error',
        ),
      );
      yield put(push('/login'));
    }
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.RESET_PASSWORD, resetPassword);
}
