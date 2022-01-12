import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';

import actions from './actions';
import types from './constants';

function* loadApplication({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading your application'));
    const api = tgpApi.candidateApplication.find;
    const payload = {
      id,
    };
    const { application } = yield call(requestHelper, api, payload);
    yield put(actions.loadApplicationActionSuccess(application));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error creating your application',
        'error',
      ),
    );
  }
}

function* updateApplication({ id, data }) {
  try {
    if (!id || !data) {
      return;
    }
    const api = tgpApi.candidateApplication.update;
    const payload = {
      id,
      data,
    };
    const { application } = yield call(requestHelper, api, payload);
    yield put(actions.loadApplicationActionSuccess(application));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error updating your application',
        'error',
      ),
    );
  }
}

function* submitApplication({ id }) {
  try {
    const api = tgpApi.candidateApplication.submit;
    const payload = {
      id,
    };
    const { application } = yield call(requestHelper, api, payload);
    yield put(actions.loadApplicationActionSuccess(application));
    yield put(push(`/campaign-application/${id}/8`));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error submitting your application',
        'error',
      ),
    );
  }
}

export default function* profilePageSaga() {
  yield takeLatest(types.LOAD_APPLICATION, loadApplication);
  yield takeLatest(types.UPDATE_APPLICATION, updateApplication);
  yield takeLatest(types.SUBMIT_APPLICATION, submitApplication);
}
