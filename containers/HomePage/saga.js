import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadHomepageCandidates() {
  try {
    const api = tgpApi.homepageCandidates;
    const { homepageCandidates } = yield call(requestHelper, api, null);
    yield put(actions.loadHomepageCandidatesActionSuccess(homepageCandidates));
  } catch (error) {
    console.log(error);
    yield put(actions.loadHomepageCandidatesActionError(error));
  }
}

function* subscribeEmail({ email, name }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Subscribing Your Email'));
    const api = tgpApi.subscribeEmail;
    const payload = {
      email: encodeURIComponent(email),
      uri: window.location.href,
      name,
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction(
        'You have subscribed to our mailing list successfully',
      ),
    );
  } catch (error) {
    console.log(error);
    yield put(snackbarActions.showSnakbarAction(error.message, 'error'));
  }
}

function* loadFeed() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading more posts'));
    const api = tgpApi.feed;
    const payload = {
      searchId: 'cb1f0987d03d4efaa767eb9f49054914',
      limit: 30,
      useCache: true,
      save: true,
    };
    const fullFeed = yield call(requestHelper, api, payload);
    yield put(actions.loadFeedActionSuccess(fullFeed));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error loading more posts', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.LOAD_HOMEPAGE_CANDIDATES, loadHomepageCandidates);
  yield takeLatest(types.SUBSCRIBE_EMAIL, subscribeEmail);
  yield takeLatest(types.LOAD_FEED, loadFeed);
}
