import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadPresidentialCandidate(action) {
  try {
    const api = tgpApi.findPresidentialCandidate;
    const { id } = action;
    const payload = { id };
    const candidate = yield call(requestHelper, api, payload);
    yield put(actions.loadPresidentialCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(actions.loadPresidentialCandidateActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  const findAction = yield takeLatest(
    types.LOAD_PRESIDENTIAL_CANDIDATE,
    loadPresidentialCandidate,
  );
}
