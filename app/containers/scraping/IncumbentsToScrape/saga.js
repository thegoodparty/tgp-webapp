import { call, put, takeLatest } from 'redux-saga/effects';
import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import types from './constants';
import actions from './actions';

function* loadIncumbents() {
  try {
    const api = tgpApi.scrapeIncumbents;
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
