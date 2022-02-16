import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';

import types from './constants';

function* sendFeedback({ stars, feedbackType, suggestion }) {
  try {
    const api = tgpApi.sendFeedback;
    const payload = {
      stars,
      feedbackType,
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
