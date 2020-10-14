import { call, put, takeLatest, select } from 'redux-saga/effects';
import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

function* loadCandidate(action) {
  try {
    const api = tgpApi.findCandidate;
    const { id, chamber, isIncumbent } = action;
    const payload = { id, chamber, isIncumbent };
    const candidate = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(actions.loadCandidateActionError(error));
  }
}

function* loadDistrictIncumbent(action) {
  try {
    const api = tgpApi.districtIncumbent;
    const { state, district } = action;
    const payload = {};
    if (state) {
      payload.state = state;
    }
    if (district) {
      payload.district = district;
    }
    const response = yield call(requestHelper, api, payload);
    yield put(actions.loadDistrictIncumbentActionSuccess(response.incumbent));
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  let action = yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);
  action = yield takeLatest(
    types.LOAD_DISTRICT_INCUMBENT,
    loadDistrictIncumbent,
  );
}
