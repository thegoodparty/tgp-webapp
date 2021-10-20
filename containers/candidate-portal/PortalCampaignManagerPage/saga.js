import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findUgc() {
  try {
    const api = tgpApi.candidateUser.ugc.find;
    const { candidateUgc } = yield call(requestHelper, api, null);
    yield put(actions.findUgcActionSuccess(candidateUgc));
  } catch (error) {
    console.log(error);
  }
}

function* updateUgc({ ugc }) {
  try {
    const api = tgpApi.candidateUser.ugc.update;
    const payload = {
      data: ugc,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findUgcAction());
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_UGC, findUgc);
  yield takeLatest(types.UPDATE_UGC, updateUgc);
}
