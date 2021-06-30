import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
// import actions from './actions';
import actions from '../AdminCandidateImagePage/actions';

function* updateComparedCandidates({ candidate }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.newCandidate.updateComparedCandidates;
    const payload = { candidate };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved...'));
    yield put(actions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error creating candidate', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPDATE_COMPARED_CANDIDATES, updateComparedCandidates);
}
