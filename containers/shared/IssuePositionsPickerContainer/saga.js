import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadIssueTopics() {
  try {
    const api = tgpApi.admin.issueTopics.list;

    const { topics } = yield call(requestHelper, api, null);
    yield put(actions.loadIssueTopicsActionSuccess(topics));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error loading topics', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_ISSUE_TOPICS, loadIssueTopics);
}
