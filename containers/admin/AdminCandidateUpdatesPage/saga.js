import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
// import actions from './actions';
import adminActions from '../AdminPage/actions';

function* createUpdate({ update, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Creating Update...'));
    const api = tgpApi.newCandidate.createCampaignUpdate;
    const payload = { update, candidateId };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Created.'));
    yield put(adminActions.loadCandidateAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving update', 'error'),
    );
  }
}

function* saveUpdate({ update, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving Update...'));
    const api = tgpApi.newCandidate.saveCampaignUpdate;
    const payload = { update };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved.'));
    yield put(adminActions.loadCandidateAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving update', 'error'),
    );
  }
}

function* deleteUpdate({ updateId, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting Update...'));
    const api = tgpApi.newCandidate.deleteCampaignUpdate;
    const payload = { id: updateId };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('deleted.'));
    yield put(adminActions.loadCandidateAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting update', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_UPDATE, createUpdate);
  yield takeLatest(types.SAVE_UPDATE, saveUpdate);
  yield takeLatest(types.DELETE_UPDATE, deleteUpdate);
}
