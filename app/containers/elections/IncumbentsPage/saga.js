import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';

import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadIncumbents() {
  try {
    const api = tgpApi.loadIncumbents;
    const incumbents = yield call(requestHelper, api, null);
    yield put(actions.loadIncumbentsActionSuccess(incumbents));
  } catch (error) {
    console.log(error);
    yield put(actions.loadIncumbentsActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_INCUMBENTS, loadIncumbents);
}
