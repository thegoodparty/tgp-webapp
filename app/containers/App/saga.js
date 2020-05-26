import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';
import snackbarActions from '../shared/SnackbarContainer/actions';

function* loadContent() {
  try {
    const api = tgpApi.content;
    const content = yield call(requestHelper, api, null);
    yield put(actions.loadContentActionSuccess(content));
  } catch (error) {
    console.log(error);
    yield put(actions.loadContentActionError(error));
  }
}

function* sendArticleFeedback(action) {
  try {
    const { id, title, feedback } = action;
    const api = tgpApi.articleFeedback;
    const payload = {
      id,
      title,
      feedback,
    };
    yield call(requestHelper, api, payload);
    snackbarActions.showSnakbarAction('Thank you for your feedback');
  } catch (error) {
    console.log(error);
    snackbarActions.showSnakbarAction('Error sending your feedback', 'error');
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CONTENT, loadContent);
  let action = yield takeLatest(
    types.SEND_ARTICLE_FEEDBACK,
    sendArticleFeedback,
  );
}
