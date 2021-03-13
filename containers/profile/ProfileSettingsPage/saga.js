import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from 'helpers/requestHelper';
import { setUserCookie } from 'helpers/cookieHelper';

import snackbarActions from 'containers/shared/SnackbarContainer/actions';

import tgpApi from 'api/tgpApi';

import types from './constants';
import actions from './actions';

function* updateUser(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const { updatedFields } = action;
    const api = tgpApi.updateUser;
    const payload = {
      ...updatedFields,
    };

    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    yield put(actions.updateUserActionSuccess(user));

    setUserCookie(user);
    yield put(snackbarActions.showSnakbarAction('Your Profile is updated'));
  } catch (error) {
    console.log('Error updating user', error);
    yield put(
      snackbarActions.showSnakbarAction('Error updating your profile', 'error'),
    );
  }
}

function* uploadAvatar(action) {
  try {
    const { fileName, fileData, withRedirect } = action;
    const api = tgpApi.uploadAvatar;
    const file = fileName && fileName.length > 0 ? fileName[0].name : false;
    const fileExt = file ? file.split('.').pop() : '';

    const data = new FormData();
    data.append('avatar', fileData);
    data.append('fileExt', fileExt);
    const response = yield call(requestHelper, api, data, true);
    const { user } = response;
    yield put(actions.updateUserActionSuccess(user));
    setUserCookie(user);
    yield put(
      snackbarActions.showSnakbarAction('Your Profile photo is updated'),
    );
    if (withRedirect) {
      yield put(push('/you'));
    }
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error updating your profile photo',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_USER, updateUser);
}
