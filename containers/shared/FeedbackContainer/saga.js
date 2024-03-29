import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import { getUserCookie } from '/helpers/cookieHelper';

import types from './constants';

function* sendFeedback({ thumbs, suggestion }) {
  try {
    let api = tgpApi.sendFeedback;
    const user = getUserCookie();
    if (!user) {
      api = tgpApi.sendGuestFeedback;
    }
    const payload = {
      thumbs,
      suggestion,
      url: window.location.pathname,
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction('Thank you for your feedback.'),
    );
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.SEND_FEEDBACK, sendFeedback);
}
