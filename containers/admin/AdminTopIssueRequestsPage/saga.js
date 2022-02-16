import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadTopIssues() {
  try {
    yield put(
      snackbarActions.showSnakbarAction('Loading Candidate Top Issues request'),
    );
    const api = tgpApi.candidateUser.issue.list;
    const { topIssues } = yield call(requestHelper, api, null);
    yield put(actions.loadTopIssuesActionSuccess(topIssues));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error loading candidate top issues request',
        'error',
      ),
    );
  }
}

function* acceptIssueRequest({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.candidateUser.issue.accept;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadTopIssuesAction());
    yield put(
      snackbarActions.showSnakbarAction('Saved (check candidate page)'),
    );
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error accepting issue request',
        'error',
      ),
    );
  }
}

function* rejectIssueRequest({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.candidateUser.issue.accept;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadTopIssuesAction());
    yield put(snackbarActions.showSnakbarAction('Update request rejected.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error accepting issue request',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_TOP_ISSUES, loadTopIssues);
  yield takeLatest(types.ACCEPT_ISSUE_REQUEST, acceptIssueRequest);
  yield takeLatest(types.REJECT_ISSUE_REQUEST, rejectIssueRequest);
}
