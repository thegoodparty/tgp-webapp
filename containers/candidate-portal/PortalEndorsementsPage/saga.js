import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* addEndorsements({ id, title, summary, link, image }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.endorsement.create;
    const payload = {
      candidateId: id,
      title,
      summary,
      link,
      image,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadEndorsementAction(id));
    yield put(snackbarActions.showSnakbarAction('Saved.'));
  } catch (error) {
    console.log('saga addEndorsement error', error);
    yield put(
      snackbarActions.showSnakbarAction('Error savings endorsement', 'error'),
    );
  }
}

function* loadEndorsements({ id }) {
  try {
    const api = tgpApi.campaign.endorsement.list;
    const payload = {
      candidateId: id,
    };
    const { endorsements } = yield call(requestHelper, api, payload);
    yield put(actions.loadEndorsementActionSuccess(endorsements));
  } catch (error) {
    console.log('saga loadEndorsements error', error);
  }
}

function* deleteEndorsement({ id, candidateId }) {
  try {
    const api = tgpApi.campaign.endorsement.delete;
    const payload = {
      id,
      candidateId,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadEndorsementAction(candidateId));
    yield put(snackbarActions.showSnakbarAction('Deleted'));
  } catch (error) {
    console.log('saga loadEndorsements error', error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error deleting your endorsement',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.ADD_ENDORSEMENT, addEndorsements);
  yield takeLatest(types.LOAD_ENDORSEMENTS, loadEndorsements);
  yield takeLatest(types.DELETE_ENDORSEMENT, deleteEndorsement);
}
