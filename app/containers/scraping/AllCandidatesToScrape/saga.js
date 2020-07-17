import { call, put, takeLatest } from 'redux-saga/effects';
import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import types from './constants';
import actions from './actions';

function* loadAllCandidates({ onlyNoData, withPresidential }) {
  try {
    const api = tgpApi.scrapeAllCandidates;
    const payload = {
      onlyNoData,
      withPresidential,
    };
    const response = yield call(requestHelper, api, payload);
    yield put(actions.loadAllCandidatesActionSuccess(response.allCandidates));
  } catch (error) {
    console.log(error);
    yield put(actions.loadAllCandidatesActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  const action = yield takeLatest(types.LOAD_ALL_CANDIDATES, loadAllCandidates);
}
