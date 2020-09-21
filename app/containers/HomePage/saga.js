import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';
import { selectAdminPageDomain } from './selectors';

function* loadChallengers(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Good Challengers'));
    const api = tgpApi.goodChallengers;
    const { goodChallengers } = yield call(requestHelper, api, null);
    yield put(actions.loadChallengersSuccess(goodChallengers));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Good Challengers', 'error'),
    );
    yield put(actions.loadChallengersError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_CHALLENGERS, loadChallengers);
}
