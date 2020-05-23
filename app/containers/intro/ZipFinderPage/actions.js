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

const loadHouseCandidatesAction = (state, districtNum) => ({
  type: types.LOAD_HOUSE_CANDIDATES,
  state,
  districtNum,
});

const loadHouseCandidatesActionSuccess = houseCandidates => ({
  type: types.LOAD_HOUSE_CANDIDATES_SUCCESS,
  houseCandidates,
});

const loadHouseCandidatesActionError = error => ({
  type: types.LOAD_HOUSE_CANDIDATES_ERROR,
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

const userCountsAction = (shortState, districtNumber) => ({
  type: types.USERS_COUNTS,
  shortState,
  districtNumber,
});

const userCountsActionSuccess = userCounts => ({
  type: types.USERS_COUNTS_SUCCESS,
  userCounts,
});

const loadBlocCandidateAction = bloc => ({
  type: types.LOAD_BLOC_CANDIDATE,
  bloc,
});

const loadBlocCandidateActionSuccess = blocCandidate => ({
  type: types.LOAD_BLOC_CANDIDATE_SUCCESS,
  blocCandidate,
});

export default {
  loadZipAction,
  loadZipActionSuccess,
  loadZipActionError,
  loadAllPresidentialAction,
  loadAllPresidentialActionSuccess,
  loadAllPresidentialActionError,
  loadHouseCandidatesAction,
  loadHouseCandidatesActionSuccess,
  loadHouseCandidatesActionError,
  geolocationToDistrictAction,
  geolocationToDistrictActionSuccess,
  geolocationToDistrictActionError,
  loadSenateCandidatesAction,
  loadSenateCandidatesActionSuccess,
  userCountsAction,
  userCountsActionSuccess,
  loadBlocCandidateAction,
  loadBlocCandidateActionSuccess,
};
