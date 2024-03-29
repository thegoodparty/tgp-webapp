import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from '/helpers/requestHelper';
import { trimObject } from '/helpers/stringHelper';

import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';

function* createCandidate({ candidate }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Creating Candidate'));
    const api = tgpApi.newCandidate.create;
    trimObject(candidate);
    const payload = { candidate };
    yield call(requestHelper, api, payload);
    yield put(push('/admin/candidates'));
    yield put(snackbarActions.showSnakbarAction('Saved'));
    window.scrollTo(0, 0);
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error creating candidate', 'error'),
    );
  }
}

// function* editCandidate({ candidate }) {
//   try {
//     yield put(snackbarActions.showSnakbarAction('Updating Candidate'));
//     const api = tgpApi.newCandidate.update;
//     const newCandidate = candidate;
//     trimObject(newCandidate);
//     const payload = { candidate: newCandidate };
//     yield call(requestHelper, api, payload);
//     // yield put(push('/admin'));
//     yield put(snackbarActions.showSnakbarAction('Saved'));
//     window.scrollTo(0, 0);
//   } catch (error) {
//     console.log(error);
//     yield put(
//       snackbarActions.showSnakbarAction('Error updating candidate', 'error'),
//     );
//   }
// }

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_CANDIDATE, createCandidate);
  // action = yield takeLatest(types.EDIT_CANDIDATE, editCandidate);
}
