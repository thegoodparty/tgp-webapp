import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';

function* updatesSignup({ email, notifications }) {
  try {
    const api = tgpApi.jobUpdates.create;
    const payload = {
      email,
      notifications,
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction('Thank you. We will keep you updated!'),
    );
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction('Error signing up.', 'error'));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATES_SIGNUP, updatesSignup);
}
