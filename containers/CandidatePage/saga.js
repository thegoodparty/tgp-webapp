import { call, put, takeLatest, all } from 'redux-saga/effects';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import requestHelper from '/helpers/requestHelper';

import tgpApi from '/api/tgpApi';
import types from './constants';
import actions from './actions';
import { getCookie } from '/helpers/cookieHelper';

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
    takeLatest(types.TRACK_SHARE, trackShare),
    takeLatest(types.TRACK_VISIT, trackVisit),
    takeLatest(types.CLAIM, claim),
  ]);
}
