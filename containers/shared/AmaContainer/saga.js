import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';

import types from './constants';

function* sendAma(action) {
  try {
    const { message, replyEmail } = action;
    const api = tgpApi.sendAma;
    const payload = {
      message,
      replyEmail,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Thank you for reaching out.'));
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  const amaAction = yield takeLatest(types.SEND_AMA, sendAma);
}
