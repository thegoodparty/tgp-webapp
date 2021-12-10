import { call, put, takeLatest, select } from 'redux-saga/effects';

// Individual exports for testing
import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import actions from './actions';
import types from './constants';

function* loadCrew() {
  try {
    const api = tgpApi.crew;

    const response = yield call(requestHelper, api, null);
    yield put(actions.loadCrewActionSuccess(response.crew));
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}

function* loadLeaderboard() {
  try {
    const api = tgpApi.leaderboard;
    const response = yield call(requestHelper, api, null);
    yield put(actions.loadLeaderboradActionSuccess(response.leaderboard));
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}



export default function* profilePageSaga() {
  yield takeLatest(types.LOAD_CREW, loadCrew);
  yield takeLatest(types.LOAD_LEADERBOARD, loadLeaderboard);
}
