import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* pledge() {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving your pledge'));
    const api = tgpApi.campaign.pledge;

    const { candidateId } = yield call(requestHelper, api, null);
    yield put(push(`/candidate-portal/${candidateId}`));
    yield put(snackbarActions.showSnakbarAction('You are now a good certified candidate!'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'An error occurred while saving your pledge',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.PLEDGE, pledge);
}
