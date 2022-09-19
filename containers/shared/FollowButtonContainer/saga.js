import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';

import types from './constants';
import actions from './actions';

function* followCandidate({ candidateId }) {
  try {
    let api = tgpApi.follow.create;
    const payload = {
      candidateId,
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction(
        'Thank you for following indie candidates.',
      ),
    );
    yield put(actions.loadUserFollowsAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving your action.', 'error'),
    );
  }
}

function* loadUserFollows() {
  try {
    let api = tgpApi.follow.list;

    const { supports } = yield call(requestHelper, api, null);
    yield put(actions.loadUserFollowsActionSuccess(supports));
    console.log('saga', supports);
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving your action.', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FOLLOW_CANDIDATE, followCandidate);
  yield takeLatest(types.LOAD_USER_FOLLOWS, loadUserFollows);
}
