import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import { candidateRoute } from '/helpers/electionsHelper';

import types from './constants';
import portalHomeActions from '../CandidatePortalHomePage/actions';

function* editUpdate({ id, update }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving your changes...'));
    const api = tgpApi.campaign.updates.update;
    const payload = { update, candidateId: id };
    yield call(requestHelper, api, payload);
    yield put(portalHomeActions.findCandidate(id));
    yield put(snackbarActions.showSnakbarAction('Saved'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving update', 'error'),
    );
  }
}

function* deleteUpdate({ id, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting update...'));
    const api = tgpApi.campaign.updates.delete;
    const payload = { id, candidateId };
    yield call(requestHelper, api, payload);
    yield put(portalHomeActions.findCandidate(candidateId));
    yield put(snackbarActions.showSnakbarAction('Updated Deleted'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting update', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.EDIT_UPDATE, editUpdate);
  yield takeLatest(types.DELETE_UPDATE, deleteUpdate);
}
