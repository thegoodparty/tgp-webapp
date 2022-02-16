import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findCandidate() {
  try {
    const api = tgpApi.candidateUser.find;
    const { candidate } = yield call(requestHelper, api, null);
    yield put(actions.findCandidateSuccess(candidate));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error loading candidate', 'error'),
    );
    console.log(error);
  }
}

function* loadStats({ range }) {
  try {
    const api = tgpApi.candidateUser.stats;
    const payload = {
      range,
    };
    const stats = yield call(requestHelper, api, payload);
    const parsed = parseStats(stats);
    yield put(actions.loadStatsActionSuccess(parsed));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error loading stats', 'error'),
    );
    console.log(error);
  }
}

const parseStats = stats => {
  return stats;
};

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_CANDIDATE, findCandidate);
  yield takeLatest(types.LOAD_STATS, loadStats);
}
