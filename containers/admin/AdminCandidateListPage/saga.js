import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadCandidates() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Candidates'));
    const api = tgpApi.admin.candidates;
    const { candidates } = yield call(requestHelper, api, null);
    yield put(actions.loadCandidatesSuccess(candidates));
  } catch (error) {
    console.log('Error loading candidates', error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Candidates', 'error'),
    );
    yield put(actions.loadCandidatesError(error));
  }
}

function* deleteCandidate({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting candidate'));
    const api = tgpApi.newCandidate.deleteCandidate;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadCandidates('local'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting candidate', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CANDIDATES, loadCandidates);
  yield takeLatest(types.DELETE_CANDIDATE, deleteCandidate);
}
