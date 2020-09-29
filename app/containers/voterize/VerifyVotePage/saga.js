import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* verifyVoter(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Checking Voter Registration'));
    const { voter } = action;
    const api = tgpApi.verifyVote;
    const payload = voter;
    const { message } = yield call(requestHelper, api, payload);
    console.log(message);
    if (message.registration_status) {
      yield put(
        snackbarActions.showSnakbarAction(
          `Registration Status: ${message.registration_status}`,
        ),
      );
    }
    yield put(actions.verifyVoterSuccessAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Invalid Voter Registration', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.VERIFY_VOTER, verifyVoter);
}
