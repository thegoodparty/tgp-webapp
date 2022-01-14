import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import actions from './actions';
import types from './constants';
import snackbarActions from '../../shared/SnackbarContainer/actions';

function* loadApplications() {
  try {
    yield put(
      snackbarActions.showSnakbarAction('Loading application in review'),
    );
    const api = tgpApi.candidateApplication.adminList;
    const { applications } = yield call(requestHelper, api, null);
    yield put(actions.loadApplicationsActionSuccess(applications));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error load application in review',
        'error',
      ),
    );
  }
}

export default function* profilePageSaga() {
  yield takeLatest(types.LOAD_APPLICATIONS, loadApplications);
}
