import { call, put, takeLatest, select } from 'redux-saga/effects';

// Individual exports for testing
import tgpApi from 'api/tgpApi';
import requestHelper from 'helpers/requestHelper';
import actions from './actions';
import types from './constants';

function* loadCrewPreview() {
  try {
    const api = tgpApi.crew;
    const payload = {
      preview: true,
    };
    const response = yield call(requestHelper, api, payload);
    yield put(
      actions.loadCrewPreviewActionSuccess(response.crew, response.crewCount),
    );
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}

export default function* profilePageSaga() {
  let action = yield takeLatest(types.LOAD_CREW_PREVIEW, loadCrewPreview);
}
