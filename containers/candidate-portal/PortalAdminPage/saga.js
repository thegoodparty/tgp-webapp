import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import { trimObject } from '/helpers/stringHelper';

import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import portalHomeActions from '../CandidatePortalHomePage/actions';

function* updateCandidate({ fields }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.update;

    const candidate = fields;
    const payload = { id: candidate.id, candidate };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(portalHomeActions.findCandidate(candidate.id));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error updating candidate', 'error'),
    );
  }
}

function* approveClaim({ email, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.approveClaim;

    const payload = { email, candidateId };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(portalHomeActions.findCandidate(candidateId));
  } catch (error) {
    console.log(error);
    if (error.response && error.response.noUser) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    } else {
      yield put(
        snackbarActions.showSnakbarAction('Error approving claim', 'error'),
      );
    }
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_CANDIDATE, updateCandidate);
  yield takeLatest(types.APPROVE_CLAIM, approveClaim);
}
