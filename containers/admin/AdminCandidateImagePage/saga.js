import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* updateCandidateImage({ candidate }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.newCandidate.updateImage;
    const payload = { candidate };
    const response = yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved...'));
    const parsed = JSON.parse(response.candidate?.data || '{}');
    yield put(actions.loadCandidateActionSuccess(parsed));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error creating candidate', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_CANDIDATE_IMAGE, updateCandidateImage);
}
