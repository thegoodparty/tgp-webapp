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

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_CANDIDATE, updateCandidate);
}
