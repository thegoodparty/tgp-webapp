import { call, put, takeLatest } from 'redux-saga/effects';
import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import types from './constants';
import actions from './actions';

function* loadAllCandidates() {
  try {
    const api = tgpApi.scrapeAllCandidates;
    const response = yield call(requestHelper, api, null);
    yield put(actions.loadAllCandidatesActionSuccess(response.allCandidates));
  } catch (error) {
    console.log(error);
    yield put(actions.loadAllCandidatesActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_ALL_CANDIDATES, loadAllCandidates);
}
