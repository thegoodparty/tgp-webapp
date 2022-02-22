import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadStaff({ id }) {
  try {
    const api = tgpApi.campaign.staff.list;
    const payload = {
      id,
    };
    const { staff } = yield call(requestHelper, api, payload);
    yield put(actions.loadStaffActionSuccess(staff));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(`Error loading staff`, 'error'),
    );
    console.log(error);
  }
}

function* addStaff({ email, role, id }) {
  try {
    const api = tgpApi.campaign.staff.create;
    const payload = {
      email,
      role,
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadStaffAction(id));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(`Error inviting ${email}`, 'error'),
    );
    console.log(error);
  }
}

function* updateStaff({ userId, candidateId, role }) {
  try {
    const api = tgpApi.campaign.staff.update;
    const payload = {
      userId,
      candidateId,
      role,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadStaffAction(candidateId));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(`Error updating candidate`, 'error'),
    );
    console.log(error);
  }
}

function* deleteStaff({ id, candidateId }) {
  try {
    const api = tgpApi.campaign.staff.delete;
    const payload = {
      id,
      candidateId,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadStaffAction(candidateId));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(`Error updating candidate`, 'error'),
    );
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.ADD_STAFF, addStaff);
  yield takeLatest(types.UPDATE_STAFF, updateStaff);
  yield takeLatest(types.DELETE_STAFF, deleteStaff);
  yield takeLatest(types.LOAD_STAFF, loadStaff);
}
