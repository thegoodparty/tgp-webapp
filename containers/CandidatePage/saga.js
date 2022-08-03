import { call, put, takeLatest, all } from 'redux-saga/effects';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import { push } from 'connected-next-router';
import requestHelper from '/helpers/requestHelper';

import tgpApi from '/api/tgpApi';
import types from './constants';
import actions from './actions';
import { getCookie } from '/helpers/cookieHelper';
import { logEvent } from '../../services/AnalyticsService';

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
    logEvent('Endorse Candidate', 'Candidate endorse button', 'Endorsements');
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

function* claim({ name, email, phone, candidateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Sending your request'));
    const api = tgpApi.campaign.claim;
    const payload = {
      name,
      email,
      phone,
      uri: window.location.href,
      candidateId,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.claimActionSuccess());
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error claiming campaign', 'error'),
    );
    console.log(error);
  }
}

export default function* saga() {
  yield all([
    takeLatest(types.SUPPORT, support),
    takeLatest(types.USER_SUPPORTS, userSupports),
    takeLatest(types.REMOVE_SUPPORT, removeSupport),
    takeLatest(types.CANDIDATE_SUPPORTS, candidateSupports),
    takeLatest(types.TRACK_SHARE, trackShare),
    takeLatest(types.TRACK_VISIT, trackVisit),
    takeLatest(types.CLAIM, claim),
  ]);
}
