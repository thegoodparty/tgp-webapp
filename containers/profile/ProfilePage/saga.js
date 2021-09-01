import { call, put, takeLatest, select } from 'redux-saga/effects';

// Individual exports for testing
import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import actions from './actions';
import types from './constants';

function* loadCrewPreview() {
  try {
    const api = tgpApi.crew;
    console.log('loading crew saga', api);

    const payload = {
      preview: true,
    };
    const response = yield call(requestHelper, api, payload);
    console.log('loading crew response', response);
    yield put(
      actions.loadCrewPreviewActionSuccess(response.crew, response.crewCount),
    );
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}

function* loadUserSupported() {
  try {
    const api = tgpApi.supportCandidate.userSupports;
    console.log('loading support saga', api);
    const payload = {
      withCandidates: true,
    };
    const { supports } = yield call(requestHelper, api, payload);
    console.log('loading support response', supports);
    yield put(actions.loadUserSupportedActionSuccess(supports));
  } catch (error) {
    console.log('support error', JSON.stringify(error));
  }
}

export default function* profilePageSaga() {
  let action = yield takeLatest(types.LOAD_CREW_PREVIEW, loadCrewPreview);
  yield takeLatest(types.LOAD_USER_SUPPORTED, loadUserSupported);
}
