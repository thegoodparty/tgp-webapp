import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* createTopIssue({ name }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.topIssues.create;
    const payload = {
      name,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadTopIssuesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving issue topic', 'error'),
    );
  }
}

function* createPosition({ name, topIssueId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.position.create;
    const payload = {
      name,
      topIssueId,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadTopIssuesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving issue topic', 'error'),
    );
  }
}

function* deleteTopIssue({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting...'));
    const api = tgpApi.admin.topIssues.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Deleted'));
    yield put(actions.loadTopIssuesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting issue topic', 'error'),
    );
  }
}

function* deletePosition({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting...'));
    const api = tgpApi.admin.position.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Deleted'));
    yield put(actions.loadTopIssuesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting position', 'error'),
    );
  }
}

function* editPosition({ id, name }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.position.update;
    const payload = {
      id,
      name,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadTopIssuesAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error editing position', 'error'),
    );
  }
}

function* loadTopIssues() {
  try {
    const api = tgpApi.admin.topIssues.list;
    const { topIssues } = yield call(requestHelper, api, null);
    yield put(actions.loadTopIssueActionSuccess(topIssues));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving issue topic', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_TOP_ISSUE, createTopIssue);
  yield takeLatest(types.CREATE_POSITION, createPosition);
  yield takeLatest(types.LOAD_TOP_ISSUES, loadTopIssues);

  yield takeLatest(types.DELETE_TOP_ISSUE, deleteTopIssue);
  yield takeLatest(types.DELETE_POSITION, deletePosition);
  yield takeLatest(types.EDIT_POSITION, editPosition);
}
