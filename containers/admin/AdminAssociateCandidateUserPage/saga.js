import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { trimObject } from 'helpers/stringHelper';

import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* associateCandidateUser({ candidateId, userEmail }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.associateCandidateUser;
    const payload = { candidateId, userEmail };
    yield call(requestHelper, api, payload);
    yield put(actions.findAssociatedUserAction(candidateId));
    yield put(snackbarActions.showSnakbarAction('Saved successfully'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error associating candidate and user. Verify there is a user with this email!',
        'error',
      ),
    );
  }
}

function* findAssociatedUser({ candidateId }) {
  try {
    const api = tgpApi.admin.findAssociateUser;
    const payload = { candidateId };
    const { user } = yield call(requestHelper, api, payload);
    yield put(actions.findAssociatedUserActionSuccess(user));
  } catch (error) {
    console.log(error);
  }
}

function* removeAssociatedUser({ candidateId }) {
  try {
    const api = tgpApi.admin.removeAssociateUser;
    const payload = { candidateId };
    yield call(requestHelper, api, payload);
    yield put(actions.findAssociatedUserActionSuccess(false));
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.ASSOCIATE_CANDIDATE_USER, associateCandidateUser);
  yield takeLatest(types.FIND_ASSOCIATED_USER, findAssociatedUser);
  yield takeLatest(types.REMOVE_ASSOCIATED_USER, removeAssociatedUser);
}
