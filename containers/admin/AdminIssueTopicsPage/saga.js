import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { validateEmail } from 'helpers/emailHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* createIssueTopic({ topic, positions }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.issueTopics.create;
    const payload = {
      topic,
      positions,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadIssueTopicsAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving issue topic', 'error'),
    );
  }
}

function* editIssueTopic({ topic }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.issueTopics.update;
    const payload = {
      topic,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadIssueTopicsAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving issue topic', 'error'),
    );
  }
}

function* deleteIssueTopic({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting...'));
    const api = tgpApi.admin.issueTopics.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Deleted'));
    yield put(actions.loadIssueTopicsAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting issue topic', 'error'),
    );
  }
}

function* loadIssueTopics() {
  try {
    const api = tgpApi.admin.issueTopics.list;

    const { topics } = yield call(requestHelper, api, null);
    yield put(actions.loadIssueTopicsActionSuccess(topics));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error loading topics', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_ISSUE_TOPIC, createIssueTopic);
  yield takeLatest(types.EDIT_ISSUE_TOPIC, editIssueTopic);
  yield takeLatest(types.DELETE_ISSUE_TOPIC, deleteIssueTopic);
  yield takeLatest(types.LOAD_ISSUE_TOPICS, loadIssueTopics);
}
