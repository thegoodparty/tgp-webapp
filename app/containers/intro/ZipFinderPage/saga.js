import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

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

function* gelocationToDistrict(action) {
  try {
    const { coords } = action;
    const lngLatStr = `${coords.latitude},${coords.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&location_type=RANGE_INTERPOLATED&result_type=street_address&latlng=${lngLatStr}`;

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
      const { district, normalizedAddress, zip, state } = response;
      if (district && normalizedAddress && zip && state) {
        yield put(push(`/elections/district/${zip}`));
        yield put(actions.geolocationToDistrictActionSuccess(response));
        setCookie('geoAddress', JSON.stringify({ ...response }));
      } else {
        // error message here
        yield put(
          snackbarActions.showSnakbarAction(
            'An Error occurred while looking for your geoLocation',
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
  const incumbentsAction = yield takeLatest(
    types.LOAD_DISTRICT_INCUMBENTS,
    loadDistrictIncumbents,
  );
  const candidatesAction = yield takeLatest(
    types.LOAD_DISTRICT_CANDIDATES,
    loadDistrictCandidates,
  );

  yield takeLatest(types.LOAD_COOKIE_ZIP, loadCookieZip);
  const geoLocationAction = yield takeLatest(
    types.GEOLOCATION_TO_DISTRICT,
    gelocationToDistrict,
  );
}
