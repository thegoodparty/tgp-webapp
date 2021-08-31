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

function* registerUpdate({ phone, zip }) {
  try {
    const api = tgpApi.updateUser;
    const payload = {
      phone,
      zip,
    };

    const { user, token } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    setCookie('token', token);
    yield put(push('/profile'));
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

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.REGISTER_UPDATE, registerUpdate);
}
