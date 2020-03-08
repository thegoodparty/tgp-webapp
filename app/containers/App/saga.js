import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadContent() {
  try {
    const api = tgpApi.content;
    const content = yield call(requestHelper, api, null);
    yield put(actions.loadContentActionSuccess(content));
  } catch (error) {
    console.log(error);
    yield put(actions.loadContentActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CONTENT, loadContent);
}
