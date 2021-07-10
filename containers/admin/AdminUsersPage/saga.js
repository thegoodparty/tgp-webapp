import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadAllUsers() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Users'));
    const api = tgpApi.admin.allUsers;
    const { users } = yield call(requestHelper, api, null);
    yield put(actions.loadAllUsersSuccess(users));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Users', 'error'),
    );
    yield put(actions.loadAllUsersError(error));
  }
}

function* deleteUser(action) {
  try {
    const { user } = action;
    yield put(snackbarActions.showSnakbarAction('Deleting User'));
    const api = tgpApi.admin.deleteUser;
    const payload = { id: user.id };
    yield call(requestHelper, api, payload);
    yield put(actions.loadAllUsers());
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error Deleting User', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_ALL_USERS, loadAllUsers);

  yield takeLatest(types.DELETE_USER, deleteUser);
}
