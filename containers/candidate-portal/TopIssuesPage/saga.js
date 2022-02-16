import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findIssue({ candidateId }) {
  try {
    let api = tgpApi.candidateUser.issue.find;
    console.log('Candidate:', candidateId, api);
    const { candidateIssue } = yield call(requestHelper, api, { candidateId });
    yield put(actions.findIssueActionSuccess(candidateIssue));
  } catch (error) {
    console.log(error);
  }
}

function* updateIssue({ issue, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.candidateUser.issue.update;
    const payload = {
      data: issue,
      candidateId,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findIssueAction(candidateId));
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
