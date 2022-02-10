import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
// import actions from './actions';
import portalHomeActions from '../../CandidatePortalHomePage/actions';

function* createUpdate({ update, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Creating Update Request...'));
    const api = tgpApi.candidateUser.updateRequest.create;
    const payload = { update, candidateId };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Update Request Created.'));
    yield put(portalHomeActions.findCandidate());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving update', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_UPDATE, createUpdate);
}
