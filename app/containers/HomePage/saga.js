import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadChallengers() {
  try {
    const api = tgpApi.goodChallengers;
    const { goodChallengers } = yield call(requestHelper, api, null);
    yield put(actions.loadChallengersActionSuccess(goodChallengers));
  } catch (error) {
    console.log(error);
    yield put(actions.loadChallengersActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CHALLENGERS, loadChallengers);
}
