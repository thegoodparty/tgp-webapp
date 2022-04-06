import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findCandidatePositions({ candidateId }) {
  try {
    let api = tgpApi.campaign.candidatePosition.list;
    const { candidatePositions } = yield call(requestHelper, api, {
      id: candidateId,
    });
    yield put(actions.findCandidatePositionsActionSuccess(candidatePositions));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error finding candidate positions',
        'error',
      ),
    );
  }
}

function* saveCandidatePosition({
  topIssueId,
  positionId,
  description,
  candidateId,
  order,
}) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.candidatePosition.create;
    const payload = {
      topIssueId,
      positionId,
      description,
      candidateId,
      order,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findCandidatePositionsAction(candidateId));
    yield put(snackbarActions.showSnakbarAction('Saved.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error saving candidate positions',
        'error',
      ),
    );
  }
}

function* updateCandidatePosition({
  id,
  topIssueId,
  positionId,
  description,
  candidateId,
}) {
  try {
    yield put(snackbarActions.showSnakbarAction('Updating...'));
    const api = tgpApi.campaign.candidatePosition.update;
    const payload = {
      id,
      topIssueId,
      positionId,
      description,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findCandidatePositionsAction(candidateId));
    yield put(snackbarActions.showSnakbarAction('updated.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error updating candidate positions',
        'error',
      ),
    );
  }
}

function* deleteCandidatePosition({ id, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting...'));
    const api = tgpApi.campaign.candidatePosition.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findCandidatePositionsAction(candidateId));
    yield put(snackbarActions.showSnakbarAction('Deleted.'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error deleting candidate positions',
        'error',
      ),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_CANDIDATE_POSITIONS, findCandidatePositions);
  yield takeLatest(types.SAVE_CANDIDATE_POSITION, saveCandidatePosition);
  yield takeLatest(types.UPDATE_CANDIDATE_POSITION, updateCandidatePosition);
  yield takeLatest(types.DELETE_CANDIDATE_POSITION, deleteCandidatePosition);
}
