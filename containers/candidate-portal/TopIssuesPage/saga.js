import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findIssue() {
  try {
    const api = tgpApi.candidateUser.issue.find;
    const { candidateIssue } = yield call(requestHelper, api, null);
    yield put(actions.findIssueActionSuccess(candidateIssue));
  } catch (error) {
    console.log(error);
  }
}

function* updateIssue({ issue }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.candidateUser.issue.update;
    const payload = {
      data: issue,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findIssueAction());
    yield put(snackbarActions.showSnakbarAction('Your request was sent'));
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_ISSUE, findIssue);
  yield takeLatest(types.UPDATE_ISSUE, updateIssue);
}
