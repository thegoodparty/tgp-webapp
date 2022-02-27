import { call, put, takeLatest, all } from 'redux-saga/effects';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import { push } from 'connected-next-router';
import { getUuid, getUserFromStateOrCookie } from '/helpers/userHelper';
import requestHelper from '/helpers/requestHelper';
import makeSelectUser from '/containers/you/YouPage/selectors';

import tgpApi from '/api/tgpApi';
import types from './constants';
import actions from './actions';
import { getCookie } from '/helpers/cookieHelper';

function* loadInactiveCandidate({ id }) {
  try {
    const api = tgpApi.newCandidate.findInactive;
    const payload = { id };
    const { candidate } = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(actions.loadCandidateActionError(error));
  }
}

function* loadCandidate({ id }) {
  try {
    const api = tgpApi.newCandidate.find;
    const payload = { id };
    const candidate = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(actions.loadCandidateActionError(error));
  }
}

function* shareImage(action) {
  try {
    const api = tgpApi.newCandidate.shareImage;
    const { candidate } = action;
    const payload = { candidate };
    yield call(requestHelper, api, payload);
  } catch (error) {
    console.log(error);
  }
}

function* support({ candidateId }) {
  try {
    yield put(
      snackbarActions.showSnakbarAction('Thank you for adding your support!'),
    );
    const api = tgpApi.supportCandidate.support;
    const payload = { candidateId };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(actions.candidateSupportsAction(candidateId));
    yield put(push(`${window.location.pathname}?share=true`));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error adding your support', 'error'),
    );
    yield put(actions.supportActionError(error));
  }
}

function* removeSupport({ candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Removing your support'));
    const api = tgpApi.supportCandidate.removeSupport;
    const payload = { candidateId };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(actions.candidateSupportsAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(`Error removing your support`, 'error'),
    );
    yield put(actions.supportActionError(error));
  }
}

function* adminDeleteSupportAction({ supportId, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Removing your support'));
    const api = tgpApi.supportCandidate.adminDeleteSupport;
    const payload = { supportId };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(actions.candidateSupportsAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(`Error deleting support`, 'error'),
    );
  }
}

function* updateSupport({ candidateId, message }) {
  try {
    const api = tgpApi.supportCandidate.updateSupport;
    const payload = { candidateId, message };
    yield call(requestHelper, api, payload);
    yield put(actions.userSupportsAction());
    yield put(actions.candidateSupportsAction(candidateId));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(`Error removing your support`, 'error'),
    );
    yield put(actions.supportActionError(error));
  }
}

function* userSupports() {
  try {
    const api = tgpApi.supportCandidate.userSupports;
    const { supports } = yield call(requestHelper, api, null);
    const supportsHash = {};
    supports.forEach((sup) => {
      supportsHash[sup.candidate] = true;
    });
    yield put(actions.userSupportsActionSuccess(supportsHash));
  } catch (error) {
    console.log(error);

    yield put(actions.userSupportsActionError(error));
  }
}

function* candidateSupports({ candidateId }) {
  try {
    const api = tgpApi.supportCandidate.candidateSupports;
    const payload = { candidateId };
    const response = yield call(requestHelper, api, payload);
    yield put(
      actions.candidateSupportsActionSuccess(
        response.candidateSupports,
        response.total,
      ),
    );
  } catch (error) {
    console.log(error);

    yield put(actions.candidateSupportsActionError(error));
  }
}

function* trackShare({ candidateId }) {
  try {
    const token = getCookie('token');
    let api;
    if (token) {
      api = tgpApi.newCandidate.trackShare;
    } else {
      api = tgpApi.newCandidate.trackGuestShare;
    }

    const payload = {
      candidateId,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.candidateSupportsAction(candidateId));
  } catch (error) {
    console.log(error);
  }
}

function* sendTopicFeedback(action) {
  try {
    const user = yield call(getUserFromStateOrCookie, makeSelectUser);
    const uuid = getUuid(user);
    const { id, title, isHelpful, feedback } = action;
    const api = tgpApi.topicFeedback;
    const payload = {
      candidateId: id,
      topicTitle: title,
      isHelpful,
      feedback,
      uuid,
    };

    yield call(requestHelper, api, payload);
    snackbarActions.showSnakbarAction('Thank you for your feedback');
  } catch (error) {
    console.log(error);
    snackbarActions.showSnakbarAction('Error sending your feedback', 'error');
  }
}

function* trackVisit({ url, data }) {
  try {
    const api = tgpApi.trackVisit;
    const payload = {
      url,
      data,
    };
    yield call(requestHelper, api, payload);
  } catch (error) {
    console.log(error);
  }
}

export default function* saga() {
  yield all([
    takeLatest(types.SUPPORT, support),
    takeLatest(types.USER_SUPPORTS, userSupports),
    takeLatest(types.REMOVE_SUPPORT, removeSupport),
    takeLatest(types.CANDIDATE_SUPPORTS, candidateSupports),
  ]);

  // yield takeLatest(types.LOAD_INACTIVE_CANDIDATE, loadInactiveCandidate);
  // yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);
  // yield takeLatest(types.SHARE_IMAGE, shareImage);
  // let action = yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);
  // action = yield takeLatest(types.CANDIDATE_SUPPORTS, candidateSupports);
  // action = yield takeLatest(
  //   types.ADMIN_DELETE_SUPPORT,
  //   adminDeleteSupportAction,
  // );
  // yield takeLatest(types.UPDATE_SUPPORT, updateSupport);
  // yield takeLatest(types.SHARE_IMAGE, shareImage);
  // yield takeLatest(types.TRACK_SHARE, trackShare);
  // yield takeLatest(types.SEND_TOPIC_FEEDBACK, sendTopicFeedback);
  // yield takeLatest(types.TRACK_VISIT, trackVisit);
}
