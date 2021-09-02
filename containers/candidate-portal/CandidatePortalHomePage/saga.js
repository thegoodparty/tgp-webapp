import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findCandidate() {
  try {
    const api = tgpApi.candidateUser.find;
    const { candidate } = yield call(requestHelper, api, null);
    console.log('sagea', candidate)
    yield put(actions.findCandidateSuccess(candidate));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error loading candidate', 'error'),
    );
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_CANDIDATE, findCandidate);
}
