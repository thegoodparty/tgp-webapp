import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from 'helpers/requestHelper';
import { setUserCookie } from 'helpers/cookieHelper';

import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import globalActions from 'containers/App/actions';

import tgpApi from 'api/tgpApi';
import { logEvent } from 'services/AnalyticsService';

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

function* changePassword({ password, oldPassword }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.changePassword;
    const payload = {
      newPassword: password,
      oldPassword,
    };

    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    yield put(globalActions.refreshTokenAction());

    setUserCookie(user);
    yield put(snackbarActions.showSnakbarAction('Your new password is saved'));
    const random = parseInt(Math.random() * 1000 + '', 10);
    yield put(push(`?save=${random}`)); // force a refresh
  } catch (error) {
    console.log('error', error);
    if (error.response?.incorrect) {
      yield put(
        snackbarActions.showSnakbarAction(
          'Current Password is incorrect',
          'error',
        ),
      );
      logEvent('change-password', 'error - incorrect password');
      yield put(
        globalActions.logErrorAction(
          'change password - incorrect password',
          error,
        ),
      );
    } else {
      yield put(
        snackbarActions.showSnakbarAction(
          'Error changing your password.',
          'error',
        ),
      );
      logEvent('change-password', 'error');
    }
  }
}

function* uploadAvatar({ imageBase64 }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.uploadAvatar;
    const payload = {
      imageBase64,
    };

    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    setUserCookie(user);
    const rand = parseInt(Math.random() * 1000, 10);
    yield put(push(`/profile/settings?updated=${rand}`));
    yield put(snackbarActions.showSnakbarAction('Your Profile is updated'));
  } catch (error) {
    console.log('Error updating user', error);
    yield put(
      snackbarActions.showSnakbarAction('Error updating your profile', 'error'),
    );
  }
}
// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_USER, updateUser);
  yield takeLatest(types.CHANGE_PASSWORD, changePassword);
  yield takeLatest(types.UPLOAD_AVATAR, uploadAvatar);
}
