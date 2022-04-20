import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';
import portalHomeActions from '../CandidatePortalHomePage/actions';

function* updateCandidate({ id, candidate }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.update;
    const payload = {
      id,
      candidate,
    };
    yield call(requestHelper, api, payload);
    yield put(portalHomeActions.findCandidate(id));
    yield put(snackbarActions.showSnakbarAction('Saved'));
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
  yield takeLatest(types.UPDATE_CANDIDATE, updateCandidate);
  yield takeLatest(types.SAVE_IMAGE, saveImage);
}
