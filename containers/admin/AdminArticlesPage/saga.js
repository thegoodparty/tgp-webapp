import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadArticlesFeedback() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Articles Feedback'));
    const api = tgpApi.admin.articlesFeedback;
    const { articles } = yield call(requestHelper, api, null);
    yield put(actions.loadArticlesFeedbackSuccess(articles));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Articles', 'error'),
    );
  }
}
// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_ARTICLES_FEEDBACK, loadArticlesFeedback);
}
