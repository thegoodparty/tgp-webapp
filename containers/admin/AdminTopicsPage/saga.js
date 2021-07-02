import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import { validateEmail } from 'helpers/emailHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* createTopic({ name, description }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.topics.create;
    const payload = {
      name,
      description,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadTopicsAction());
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction('Error saving topic', 'error'));
  }
}

function* editTopic({ topic }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.admin.topics.update;
    const payload = {
      topic,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Saved'));
    yield put(actions.loadTopicsAction());
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction('Error saving topic', 'error'));
  }
}

function* deleteTopic({ id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting...'));
    const api = tgpApi.admin.topics.delete;
    const payload = {
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(snackbarActions.showSnakbarAction('Deleted'));
    yield put(actions.loadTopicsAction());
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting topic', 'error'),
    );
  }
}

function* loadTopics() {
  try {
    const api = tgpApi.admin.topics.list;

    const { topics } = yield call(requestHelper, api, null);
    yield put(actions.loadTopicsActionSuccess(topics));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error loading topics', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.CREATE_TOPIC, createTopic);
  yield takeLatest(types.EDIT_TOPIC, editTopic);
  yield takeLatest(types.DELETE_TOPIC, deleteTopic);
  yield takeLatest(types.LOAD_TOPICS, loadTopics);
}
