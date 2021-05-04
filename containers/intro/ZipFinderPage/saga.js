import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-next-router';

import requestHelper from 'helpers/requestHelper';
import { getCookie, setCookie } from 'helpers/cookieHelper';
import { GOOGLE_API_KEY } from 'api/ENV';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
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
      yield put(push(`/elections/district/${zip}`));
    }
    setCookie('zip', JSON.stringify(zipWithDistricts));
  } catch (error) {
    console.log(error);
    yield put(actions.loadZipActionError(error));
    yield put(snackbarActions.showSnakbarAction('Invalid Zip Code', 'error'));
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
    const { presidential } = yield call(requestHelper, api, null);

    yield put(actions.loadAllPresidentialActionSuccess(presidential));
  } catch (error) {
    console.log(error);
    yield put(actions.loadAllPresidentialActionError(error));
  }
}

function* loadHouseCandidates(action) {
  try {
    const { state, districtNum } = action;
    const api = tgpApi.houseCandidates;
    const payload = { state, district: districtNum };
    const response = yield call(requestHelper, api, payload);
    yield put(
      actions.loadHouseCandidatesActionSuccess(response.houseCandidates),
    );
  } catch (error) {
    console.log(error);
    yield put(actions.loadHouseCandidatesActionError(error));
  }
}

function* loadSenateCandidates(action) {
  try {
    const { state } = action;
    const api = tgpApi.senateCandidates;
    const payload = { state };
    const response = yield call(requestHelper, api, payload);
    yield put(
      actions.loadSenateCandidatesActionSuccess(response.senateCandidates),
    );
  } catch (error) {
    console.log(error);
    // yield put(actions.loadDistrictCandidatesActionError(error));
  }
}

function* loadBlocCandidate(action) {
  try {
    const { bloc } = action;
    const api = tgpApi.findBlocCandidate;
    const payload = { bloc };
    const candidate = yield call(requestHelper, api, payload);
    yield put(actions.loadBlocCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
  }
}

function* gelocationToDistrict(action) {
  try {
    const { coords } = action;
    const lngLatStr = `${coords.latitude},${coords.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&latlng=${lngLatStr}`;

    const api = {
      url,
      method: 'GET',
    };
    const address = yield call(requestHelper, api, null);

    if (address && address.status === 'OK') {
      const formattedAddress = address.results[0].formatted_address;
      const api2 = tgpApi.fullAddressToDistrict;
      const payload2 = { address: JSON.stringify(formattedAddress) };
      const response = yield call(requestHelper, api2, payload2);
      const { zip } = response;
      if (zip) {
        yield put(push(`/elections/district/${zip}`));
        yield put(actions.geolocationToDistrictActionSuccess(response));
        setCookie('geoAddress', JSON.stringify({ ...response }));
      } else {
        // error message here
        yield put(
          snackbarActions.showSnakbarAction(
            'An Error occurred while looking for your geoLocation',
            'error',
          ),
        );
        yield put(actions.geolocationToDistrictActionError({ message: 'err' }));
      }
    } else {
      yield put(actions.geolocationToDistrictActionError({ message: 'err' }));
    }
  } catch (err) {
    console.log(err);
    yield put(actions.geolocationToDistrictActionError(err));
  }
}

// Individual exports for testing
export default function* saga() {
  const zipAction = yield takeLatest(types.LOAD_ZIP, loadZip);
  yield takeLatest(types.LOAD_ALL_PRESIDENTIAL, loadPresidential);
  const houseAction = yield takeLatest(
    types.LOAD_HOUSE_CANDIDATES,
    loadHouseCandidates,
  );

  const senateAction = yield takeLatest(
    types.LOAD_SENATE_CANDIDATES,
    loadSenateCandidates,
  );

  yield takeLatest(types.LOAD_COOKIE_ZIP, loadCookieZip);
  const geoLocationAction = yield takeLatest(
    types.GEOLOCATION_TO_DISTRICT,
    gelocationToDistrict,
  );

  const blocAction = yield takeLatest(
    types.LOAD_BLOC_CANDIDATE,
    loadBlocCandidate,
  );
}
