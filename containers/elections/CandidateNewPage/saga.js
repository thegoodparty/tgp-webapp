import { call, put, takeLatest, select } from 'redux-saga/effects';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import { push } from 'connected-next-router';

import requestHelper from 'helpers/requestHelper';

import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadCandidate({ id, chamber, isIncumbent }) {
  try {
    const api = tgpApi.findCandidate;
    const payload = { id, chamber, isIncumbent };
    const candidate = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(actions.loadCandidateActionError(error));
  }
}

function* shareImage(action) {
  try {
    const api = tgpApi.shareImage;
    const { candidate } = action;
    const payload = { candidate };
    yield call(requestHelper, api, payload);
  } catch (error) {
    console.log(error);
  }
}

function* support({ candidateId }) {
  try {
    yield put(
      snackbarActions.showSnakbarAction('Thank you for adding your support!'),
    );
    const api = tgpApi.supportCandidate.support;
    const payload = { candidateId };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(push(`${window.location.pathname}?preview=true&support=true`));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error adding your support', 'error'),
    );
    yield put(actions.supportActionError(error));
  }
}

function* removeSupport({ candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Removing your support'));
    const api = tgpApi.supportCandidate.removeSupport;
    const payload = { candidateId };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(actions.candidateSupportsAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(`Error removing your support`, 'error'),
    );
    yield put(actions.supportActionError(error));
  }
}

function* updateSupport({ candidateId, message }) {
  try {
    const api = tgpApi.supportCandidate.updateSupport;
    const payload = { candidateId, message };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(actions.candidateSupportsAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(`Error removing your support`, 'error'),
    );
    yield put(actions.supportActionError(error));
  }
}

function* userSupports() {
  try {
    const api = tgpApi.supportCandidate.userSupports;
    const { supports } = yield call(requestHelper, api, null);
    const supportsHash = {};
    supports.forEach(sup => {
      supportsHash[sup.candidate] = true;
    });
    yield put(actions.userSupportsActionSuccess(supportsHash));
  } catch (error) {
    console.log(error);

    yield put(actions.userSupportsActionError(error));
  }
}

function* candidateSupports({ candidateId }) {
  try {
    const api = tgpApi.supportCandidate.candidateSupports;
    const payload = { candidateId };
    const response = yield call(requestHelper, api, payload);
    yield put(
      actions.candidateSupportsActionSuccess(response.candidateSupports),
    );
  } catch (error) {
    console.log(error);

    yield put(actions.candidateSupportsActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);
  yield takeLatest(types.SHARE_IMAGE, shareImage)
  let action = yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);
  yield takeLatest(types.SUPPORT, support);
  yield takeLatest(types.USER_SUPPORTS, userSupports);
  action = yield takeLatest(types.CANDIDATE_SUPPORTS, candidateSupports);
  yield takeLatest(types.REMOVE_SUPPORT, removeSupport);
  yield takeLatest(types.UPDATE_SUPPORT, updateSupport);
  yield takeLatest(types.SHARE_IMAGE, shareImage);
}
