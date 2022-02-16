import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import { trimObject } from '/helpers/stringHelper';

import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';

function* updateCandidate({ candidate }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.newCandidate.update;
    trimObject(candidate);
    const payload = { candidate };
    yield call(requestHelper, api, payload);
    // yield put(push('/admin'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error creating candidate', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_CANDIDATE, updateCandidate);
}
