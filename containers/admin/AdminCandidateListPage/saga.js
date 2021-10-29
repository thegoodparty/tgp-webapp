import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import { setCookie } from 'helpers/cookieHelper';
import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadCandidates(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Candidates'));
    const { chamber } = action;
    const api = tgpApi.admin.candidates;
    const payload = { chamber };
    const { candidates } = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidatesSuccess(candidates));
  } catch (error) {
    console.log(error);
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

function* logAsCandidate({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Logging in as a candidate'));
    const api = tgpApi.admin.logAsCandidate;
    const payload = {
      id,
    };
    const { token } = yield call(requestHelper, api, payload);

    setCookie('asToken', token);
    yield put(push('/candidate-portal'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error logging in as candidate',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CANDIDATES, loadCandidates);
  yield takeLatest(types.DELETE_CANDIDATE, deleteCandidate);
  yield takeLatest(types.LOG_AS_CANDIDATE, logAsCandidate);
}
