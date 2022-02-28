import { call,  takeLatest,} from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';

import tgpApi from '/api/tgpApi';
import types from './constants';

function* shareImage(action) {
  try {
    const api = tgpApi.newCandidate.shareImage;
    const { candidate } = action;
    const payload = { candidate };
    yield call(requestHelper, api, payload);
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.SHARE_IMAGE, shareImage);
}
