import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import tgpApi from '/api/tgpApi';
import requestHelper from '/helpers/requestHelper';
import actions from './actions';
import types from './constants';
import snackbarActions from '../../shared/SnackbarContainer/actions';

function* loadCandidates() {
  try {
    const api = tgpApi.follow.list;
    const updatedApi = {
      ...api,
      url: `${api.url}?withCandidates=true`,
    };
    const { candidates } = yield call(requestHelper, updatedApi, null);
    yield put(actions.loadCandidatesActionSuccess(candidates));
  } catch (error) {
    yield put(actions.loadCandidatesActionError());
    console.log('load candidates error', JSON.stringify(error));
  }
}

export default function* profilePageSaga() {
  yield takeLatest(types.LOAD_CANDIDATES, loadCandidates);
}
