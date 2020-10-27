import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import globalActions from 'containers/App/actions';

import types from './constants';
import actions from './actions';
import { electionRoute } from '../../../helpers/electionsHelper';

function* verifyVoter({ voter, user }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Checking Voter Registration'));
    const api = tgpApi.verifyVote;
    const payload = voter;
    const { voteStatus } = yield call(requestHelper, api, payload);
    if (voteStatus !== '') {
      yield put(
        snackbarActions.showSnakbarAction(`Registration Status: ${voteStatus}`),
      );
    }
    // this will update the user
    yield put(globalActions.refreshTokenAction());
    yield put(actions.verifyVoterActionSuccess(voteStatus));
    if (voteStatus === 'verified') {
      yield put(push(electionRoute(user)));
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Invalid Voter Registration', 'error'),
    );
    yield put(actions.verifyVoterActionError(error));
  }
}

function* registerVoter({ voter }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Registering You To Vote'));
    const api = tgpApi.registerVote;
    const payload = voter;
    const { vaResponse } = yield call(requestHelper, api, payload);
    // this will update the user
    yield put(globalActions.refreshTokenAction());
    yield put(actions.registerVoterActionSuccess(vaResponse));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Invalid Voter Registration', 'error'),
    );
    yield put(actions.registerVoterActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.VERIFY_VOTER, verifyVoter);
  yield takeLatest(types.REGISTER_VOTER, registerVoter);
}
