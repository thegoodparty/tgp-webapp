import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { push } from 'connected-next-router';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import {
  deleteSignupRedirectCookie,
  getSignupRedirectCookie,
  setUserCookie,
} from 'helpers/cookieHelper';

import types from './constants';

function* setPassword({ password }) {
  try {
    const api = tgpApi.addPassword;
    const payload = {
      password,
    };
    const { user } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    if (!user.zip) {
      yield put(push('/register/set-zipcode'));
    } else {
      const redirectCookie = getSignupRedirectCookie();
      if (redirectCookie) {
        yield put(push(redirectCookie.route));
        deleteSignupRedirectCookie();
      } else {
        yield put(push('/profile'));
      }
      yield put(
        snackbarActions.showSnakbarAction(
          'Your account is protected with a password.',
        ),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error setting your password', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.SET_PASSWORD, setPassword);
}
