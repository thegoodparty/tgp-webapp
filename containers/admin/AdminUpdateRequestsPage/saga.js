import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadUgc() {
  try {
    yield put(
      snackbarActions.showSnakbarAction('Loading Candidate update requests'),
    );
    const api = tgpApi.candidateUser.ugc.list;
    const { ugc } = yield call(requestHelper, api, null);
    yield put(actions.loadUgcsActionSuccess(ugc));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'ErrorCandidate update requests',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_UGC, loadUgc);
}
