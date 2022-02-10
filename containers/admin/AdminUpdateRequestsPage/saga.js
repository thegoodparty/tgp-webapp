import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
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
        'Error loading candidate update requests',
        'error',
      ),
    );
  }
}

function* acceptRequest({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.candidateUser.ugc.accept;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadUgcsAction());
    yield put(
      snackbarActions.showSnakbarAction('Saved (check candidate page)'),
    );
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error accepting requests', 'error'),
    );
  }
}

function* rejectRequest({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.candidateUser.ugc.reject;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadUgcsAction());
    yield put(snackbarActions.showSnakbarAction('Update request rejected.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error accepting requests', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_UGC, loadUgc);
  yield takeLatest(types.ACCEPT_REQUEST, acceptRequest);
  yield takeLatest(types.REJECT_REQUEST, rejectRequest);
}
