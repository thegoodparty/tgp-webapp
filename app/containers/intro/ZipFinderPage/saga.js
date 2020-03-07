import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import requestHelper from 'helpers/requestHelper';
import { getCookie, setCookie } from 'helpers/cookieHelper';

import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadZip(action) {
  try {
    const { zip, redirect } = action;
    const api = tgpApi.zipToDistrict;
    const payload = { zip };
    const zipWithDistricts = yield call(requestHelper, api, payload);
    yield put(actions.loadZipActionSuccess(zipWithDistricts));
    if (redirect) {
      push(`/elections/district/${zip}`);
    }
    setCookie('zip', JSON.stringify(zipWithDistricts));
  } catch (error) {
    console.log(error);
    yield put(actions.loadZipActionError(error));
  }
}

function* loadCookieZip() {
  try {
    const zipWithDistricts = getCookie('zip');
    if (zipWithDistricts) {
      yield put(actions.loadZipActionSuccess(JSON.parse(zipWithDistricts)));
    }
  } catch (error) {
    console.log(error);
  }
}

function* loadPresidential() {
  try {
    const api = tgpApi.allPresidential;
    const response = yield call(requestHelper, api, null);
    yield put(actions.loadAllPresidentialActionSuccess(response.presidential));
  } catch (error) {
    console.log(error);
    yield put(actions.loadAllPresidentialActionError(error));
  }
}

function* loadDistrictIncumbents(action) {
  try {
    const { state, districtNum } = action;
    const api = tgpApi.districtIncumbents;
    const payload = { state, district: districtNum };
    const response = yield call(requestHelper, api, payload);
    yield put(actions.loadDistrictIncumbentsActionSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(actions.loadDistrictIncumbentsActionError(error));
  }
}

function* loadDistrictCandidates(action) {
  try {
    const { state, districtNum } = action;
    const api = tgpApi.districtCandidates;
    const payload = { state, district: districtNum };
    const response = yield call(requestHelper, api, payload);
    yield put(actions.loadDistrictCandidatesActionSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(actions.loadDistrictCandidatesActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  const zipAction = yield takeLatest(types.LOAD_ZIP, loadZip);
  yield takeLatest(types.LOAD_ALL_PRESIDENTIAL, loadPresidential);
  const incumbentsAction = yield takeLatest(
    types.LOAD_DISTRICT_INCUMBENTS,
    loadDistrictIncumbents,
  );
  const candidatesAction = yield takeLatest(
    types.LOAD_DISTRICT_CANDIDATES,
    loadDistrictCandidates,
  );

  yield takeLatest(types.LOAD_COOKIE_ZIP, loadCookieZip);
}
