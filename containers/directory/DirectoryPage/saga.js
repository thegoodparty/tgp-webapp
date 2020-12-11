import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* allCandidates() {
  try {
    const api = tgpApi.directory.allCandidates;
    const candidates = yield call(requestHelper, api, null);
    yield put(actions.allCandidatesActionSuccess(candidates));
  } catch (error) {
    console.log(error);
    yield put(actions.allCandidatesActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.ALL_CANDIDATES, allCandidates);
}
