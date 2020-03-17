import types from './constants';

const loadZipAction = (zip, redirect = false) => ({
  type: types.LOAD_ZIP,
  zip,
  redirect,
});

const loadZipActionSuccess = zipWithDistricts => ({
  type: types.LOAD_ZIP_SUCCESS,
  zipWithDistricts,
});

const loadZipActionError = error => ({
  type: types.LOAD_ZIP_ERROR,
  error,
});

const loadCookieZipAction = (redirect = false) => ({
  type: types.LOAD_COOKIE_ZIP,
  redirect,
});

const loadAllPresidentialAction = () => ({
  type: types.LOAD_ALL_PRESIDENTIAL,
});

const loadAllPresidentialActionSuccess = presidential => ({
  type: types.LOAD_ALL_PRESIDENTIAL_SUCCESS,
  presidential,
});

const loadAllPresidentialActionError = error => ({
  type: types.LOAD_ALL_PRESIDENTIAL_ERROR,
  error,
});

const loadDistrictIncumbentsAction = (state, districtNum) => ({
  type: types.LOAD_DISTRICT_INCUMBENTS,
  state,
  districtNum,
});

const loadDistrictIncumbentsActionSuccess = districtIncumbents => ({
  type: types.LOAD_DISTRICT_INCUMBENTS_SUCCESS,
  districtIncumbents,
});

const loadDistrictIncumbentsActionError = error => ({
  type: types.LOAD_DISTRICT_INCUMBENTS_ERROR,
  error,
});

const loadDistrictCandidatesAction = (state, districtNum) => ({
  type: types.LOAD_DISTRICT_CANDIDATES,
  state,
  districtNum,
});

const loadDistrictCandidatesActionSuccess = districtCandidates => ({
  type: types.LOAD_DISTRICT_CANDIDATES_SUCCESS,
  districtCandidates,
});

const loadDistrictCandidatesActionError = error => ({
  type: types.LOAD_DISTRICT_CANDIDATES_ERROR,
  error,
});

const loadSenateCandidatesAction = state => ({
  type: types.LOAD_SENATE_CANDIDATES,
  state,
});

const loadSenateCandidatesActionSuccess = senateCandidates => ({
  type: types.LOAD_SENATE_CANDIDATES_SUCCESS,
  senateCandidates,
});

const loadSenateCandidatesActionError = error => ({
  type: types.LOAD_SENATE_CANDIDATES_ERROR,
  error,
});

const geolocationToDistrictAction = coords => ({
  type: types.GEOLOCATION_TO_DISTRICT,
  coords,
});

const geolocationToDistrictActionSuccess = geoLocation => ({
  type: types.GEOLOCATION_TO_DISTRICT_SUCCESS,
  geoLocation,
});

const geolocationToDistrictActionError = error => ({
  type: types.GEOLOCATION_TO_DISTRICT_ERROR,
  error,
});

const changeFiltersAction = filters => ({
  type: types.CHANGE_FILTERS,
  filters,
});

export default {
  loadZipAction,
  loadZipActionSuccess,
  loadZipActionError,
  loadCookieZipAction,
  loadAllPresidentialAction,
  loadAllPresidentialActionSuccess,
  loadAllPresidentialActionError,
  loadDistrictIncumbentsAction,
  loadDistrictIncumbentsActionSuccess,
  loadDistrictIncumbentsActionError,
  loadDistrictCandidatesAction,
  loadDistrictCandidatesActionSuccess,
  loadDistrictCandidatesActionError,
  geolocationToDistrictAction,
  geolocationToDistrictActionSuccess,
  geolocationToDistrictActionError,
  changeFiltersAction,
  loadSenateCandidatesAction,
  loadSenateCandidatesActionSuccess,
  loadSenateCandidatesActionError,
};
