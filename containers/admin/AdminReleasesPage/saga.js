import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { validateEmail } from 'helpers/emailHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* createRelease({ release }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.releases.create;
    const payload = release;
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadReleasesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving release', 'error'),
    );
  }
}

function* editRelease({ release }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.releases.update;
    const payload = {
      release,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadReleasesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving release', 'error'),
    );
  }
}

function* deleteRelease({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting...'));
    const api = tgpApi.admin.releases.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Deleted'));
    yield put(actions.loadReleasesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting release', 'error'),
    );
  }
}

function* loadReleases() {
  try {
    const api = tgpApi.admin.releases.list;

    const { releases } = yield call(requestHelper, api, null);
    yield put(actions.loadReleasesActionSuccess(releases));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error loading releases', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_RELEASE, createRelease);
  yield takeLatest(types.EDIT_RELEASE, editRelease);
  yield takeLatest(types.DELETE_RELEASE, deleteRelease);
  yield takeLatest(types.LOAD_RELEASES, loadReleases);
}
