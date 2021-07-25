import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';
import adminActions from '../AdminCandidateImagePage/actions';
import { trimObject } from '../../../helpers/stringHelper';

function* updateComparedCandidates({ candidate }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.newCandidate.updateComparedCandidates;
    trimObject(candidate);
    const payload = { candidate };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved...'));
    yield put(adminActions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error creating candidate', 'error'),
    );
  }
}

function* loadTopics() {
  try {
    const api = tgpApi.admin.topics.list;
    const { topics } = yield call(requestHelper, api, null);
    yield put(actions.loadTopicsActionSuccess(topics));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error creating candidate', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_COMPARED_CANDIDATES, updateComparedCandidates);
  yield takeLatest(types.LOAD_TOPICS, loadTopics);
}
