import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import tgpApi from '/api/tgpApi';
import requestHelper from '/helpers/requestHelper';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import {
  getApplicationStorage,
  setApplicationStorage,
} from '/helpers/localstorageHelper';
import { getUserCookie } from '/helpers/cookieHelper';

import actions from './actions';
import types from './constants';

function* loadApplication({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading your application'));
    if (id === 'guest') {
      const user = getUserCookie(true);
      if (user) {
        yield put(push(`/profile/campaigns`));
      } else {
        const app = getApplicationStorage() || { id: 'guest' };
        yield put(actions.loadApplicationActionSuccess(app, false));
      }
    } else {
      const api = tgpApi.candidateApplication.find;
      const payload = {
        id,
      };
      const { application, reviewMode } = yield call(
        requestHelper,
        api,
        payload,
      );
      yield put(actions.loadApplicationActionSuccess(application, reviewMode));
    }
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
    if (id === 'guest') {
      const app = getApplicationStorage() || { id: 'guest' };
      const updated = { ...app, ...data };
      setApplicationStorage(updated);
      yield put(actions.loadApplicationActionSuccess(updated));
    } else {
      const api = tgpApi.candidateApplication.update;
      const payload = {
        id,
        data,
      };
      const { application } = yield call(requestHelper, api, payload);
      yield put(actions.loadApplicationActionSuccess(application));
    }
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

function* approveApplication({ id, feedback }) {
  try {
    const api = tgpApi.candidateApplication.adminApprove;
    const payload = {
      id,
      feedback,
    };
    const { application } = yield call(requestHelper, api, payload);
    yield put(actions.loadApplicationActionSuccess(application));
    yield put(push('/admin/application-requests'));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error approving the application',
        'error',
      ),
    );
  }
}

function* rejectApplication({ id, feedback }) {
  try {
    const api = tgpApi.candidateApplication.adminReject;
    const payload = {
      id,
      feedback,
    };
    const { application } = yield call(requestHelper, api, payload);
    yield put(actions.loadApplicationActionSuccess(application));
    yield put(push('/admin/application-requests'));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error rejecting the application',
        'error',
      ),
    );
  }
}

function* loadTopIssues() {
  try {
    const api = tgpApi.admin.topIssues.list;

    const { topIssues } = yield call(requestHelper, api, null);
    yield put(actions.loadATopIssuesActionSuccess(topIssues));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error loading topics', 'error'),
    );
  }
}

export default function* profilePageSaga() {
  yield takeLatest(types.LOAD_APPLICATION, loadApplication);
  yield takeLatest(types.UPDATE_APPLICATION, updateApplication);
  yield takeLatest(types.SUBMIT_APPLICATION, submitApplication);
  yield takeLatest(types.APPROVE_APPLICATION, approveApplication);
  yield takeLatest(types.REJECT_APPLICATION, rejectApplication);
  yield takeLatest(types.LOAD_TOP_ISSUES, loadTopIssues);
}
