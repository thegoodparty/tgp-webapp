import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findUgc({ id }) {
  try {
    const api = tgpApi.campaign.ugc.find;
    const payload = {
      id,
    };
    const { candidateUgc } = yield call(requestHelper, api, payload);
    yield put(actions.findUgcActionSuccess(candidateUgc));
  } catch (error) {
    console.log(error);
  }
}

function* updateUgc({ id, ugc }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.ugc.update;
    const payload = {
      id,
      data: ugc,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findUgcAction());
    yield put(snackbarActions.showSnakbarAction('Your request was sent'));
  } catch (error) {
    console.log(error);
  }
}

function* saveImage({ id, url }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.image.create;
    const payload = {
      id,
      url,
    };
    const { image } = yield call(requestHelper, api, payload);
    yield put(actions.saveImageActionSuccess(image));
    yield put(snackbarActions.showSnakbarAction('Saved'));
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_UGC, findUgc);
  yield takeLatest(types.UPDATE_UGC, updateUgc);
  yield takeLatest(types.SAVE_IMAGE, saveImage);
}
