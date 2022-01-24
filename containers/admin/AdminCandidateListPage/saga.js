import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadCandidates() {
  try {
    console.log('loading candidates1');
    yield put(snackbarActions.showSnakbarAction('Loading Candidates'));
    console.log('loading candidates2');
    const api = tgpApi.admin.candidates;
    console.log('loading candidates3');
    const { candidates } = yield call(requestHelper, api, null);
    console.log('loading candidates4');
    yield put(actions.loadCandidatesSuccess(candidates));
    console.log('loading candidates5');
  } catch (error) {
    console.log('Error loading candidates', error);
    console.log(JSON.stringify(error));
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
