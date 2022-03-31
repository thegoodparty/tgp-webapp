import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';
import portalHomeActions from './actions';
import { candidateRoute } from '../../../helpers/electionsHelper';

function* findCandidate({ id }) {
  try {
    const api = tgpApi.campaign.find;
    const payload = {
      id,
    };
    const { candidate } = yield call(requestHelper, api, payload);
    yield put(actions.findCandidateSuccess(candidate));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error loading candidate', 'error'),
    );
    console.log(error);
  }
}

function* loadStats({ range, id }) {
  try {
    const api = tgpApi.campaign.stats;
    const payload = {
      range,
      id,
    };
    const stats = yield call(requestHelper, api, payload);
    yield put(actions.loadStatsActionSuccess(stats));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error loading stats', 'error'),
    );
    console.log(error);
  }
}

function* loadRole({ id }) {
  try {
    const api = tgpApi.campaign.staff.role;
    const payload = {
      id,
    };
    const role = yield call(requestHelper, api, payload);
    yield put(actions.loadRoleActionSuccess(role));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error loading stats', 'error'),
    );
    console.log(error);
  }
}

function* updatePreferences({ id, preferences }) {
  try {
    yield put(
      snackbarActions.showSnakbarAction(
        'Saving. Button code is copied to your clipboard',
      ),
    );
    const api = tgpApi.campaign.preferences.update;
    const payload = {
      candidateId: id,
      preferences,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findCandidate(id));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error updating preferences', 'error'),
    );
    console.log(error);
  }
}

const Node = (
  <span>
    'Update Created'<a href="/">tomer</a>
  </span>
);

function* createUpdate({ candidate, update }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Creating Update...'));
    const api = tgpApi.campaign.updates.create;
    const payload = { update, candidateId: candidate.id };
    const { updateId } = yield call(requestHelper, api, payload);
    const link = `${candidateRoute(candidate)}#candidate-update-${updateId}`;
    yield put(
      snackbarActions.showSnakbarAction(
        <span>
          Update {update.title} Created{' '}
          <a href={link} target="_blank" style={{ color: '#FFF' }}>
            <strong>View Update</strong>
          </a>
        </span>,
      ),
    );
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving update', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_CANDIDATE, findCandidate);
  yield takeLatest(types.LOAD_STATS, loadStats);
  yield takeLatest(types.LOAD_ROLE, loadRole);
  yield takeLatest(types.UPDATE_PREFERENCES, updatePreferences);
  yield takeLatest(types.CREATE_UPDATE, createUpdate);
}
