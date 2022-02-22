import { call, put, takeLatest, select } from 'redux-saga/effects';

// Individual exports for testing
import tgpApi from '/api/tgpApi';
import requestHelper from '/helpers/requestHelper';
import actions from './actions';
import types from './constants';

function* loadUserSupported() {
  try {
    const api = tgpApi.supportCandidate.userSupports;
    const payload = {
      withCandidates: true,
    };
    const { supports } = yield call(requestHelper, api, payload);
    yield put(actions.loadUserSupportedActionSuccess(supports));
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}

function* loadUpdates() {
  try {
    const api = tgpApi.supportCandidate.supportUpdates;
    const { updates } = yield call(requestHelper, api, null);
    yield put(actions.loadUpdatesActionSuccess(updates));
  } catch (error) {
    console.log('updates error', JSON.stringify(error));
  }
}

function* loadStaff() {
  try {
    const api = tgpApi.staff.userStaff;
    const { staff } = yield call(requestHelper, api, null);
    yield put(actions.loadStaffActionSuccess(staff));
  } catch (error) {
    console.log('staff error', JSON.stringify(error));
  }
}

export default function* profilePageSaga() {
  yield takeLatest(types.LOAD_USER_SUPPORTED, loadUserSupported);
  yield takeLatest(types.LOAD_UPDATES, loadUpdates);
  yield takeLatest(types.LOAD_STAFF, loadStaff);
}
