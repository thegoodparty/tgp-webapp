import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

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
  yield takeLatest(types.LOAD_RELEASES, loadReleases);
}
