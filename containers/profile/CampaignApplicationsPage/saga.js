import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import tgpApi from '/api/tgpApi';
import requestHelper from '/helpers/requestHelper';
import actions from './actions';
import types from './constants';
import snackbarActions from '../../shared/SnackbarContainer/actions';

function* createApplication() {
  try {
    yield put(snackbarActions.showSnakbarAction('Creating a new application'));
    const api = tgpApi.candidateApplication.create;
    const { id } = yield call(requestHelper, api, null);
    yield put(push(`/campaign-application/${id}/1`));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error creating your application',
        'error',
      ),
    );
  }
}

function* deleteApplication({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting application'));
    const api = tgpApi.candidateApplication.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadApplicationsAction());
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error creating your application',
        'error',
      ),
    );
  }
}

function* loadApplications() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading your application'));
    const api = tgpApi.candidateApplication.list;
    const { applications } = yield call(requestHelper, api, null);
    yield put(actions.loadApplicationsActionSuccess(applications));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error creating your application',
        'error',
      ),
    );
  }
}

export default function* profilePageSaga() {
  yield takeLatest(types.CREATE_APPLICATION, createApplication);
  yield takeLatest(types.LOAD_APPLICATIONS, loadApplications);
  yield takeLatest(types.DELETE_APPLICATION, deleteApplication);
}
