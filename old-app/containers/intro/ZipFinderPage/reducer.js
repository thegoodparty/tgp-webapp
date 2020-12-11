/*
 *
 * ZipFinderPage reducer
 *
 */

import produce from 'immer';
import types from './constants';

export const initialState = {
  zipWithDistricts: false,
  geoLocation: false,
  presidential: false,
  houseCandidates: false,
  senateCandidates: false,
  loading: false,
  error: false,
  geoError: false,
  userCounts: false,
  blocCandidate: false,
  joinCandidate: false,
  growCandidate: false,
};

/* eslint-disable default-case, no-param-reassign */
const zipFinderPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ZIP:
        draft.zipWithDistricts = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.LOAD_ZIP_SUCCESS:
        draft.zipWithDistricts = action.zipWithDistricts;
        draft.loading = false;
        draft.error = false;
        break;

      case types.LOAD_ZIP_ERROR:
        draft.zipWithDistricts = false;
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.LOAD_ALL_PRESIDENTIAL:
        // draft.presidential = false;
        break;

      case types.LOAD_ALL_PRESIDENTIAL_SUCCESS:
        draft.presidential = action.presidential;
        break;

      case types.LOAD_ALL_PRESIDENTIAL_ERROR:
        draft.presidential = false;
        break;

      case types.LOAD_HOUSE_CANDIDATES:
        // draft.houseCandidates = false;
        break;

      case types.LOAD_HOUSE_CANDIDATES_SUCCESS:
        draft.houseCandidates = action.houseCandidates;
        break;

      case types.LOAD_HOUSE_CANDIDATES_ERROR:
        draft.houseCandidates = false;
        break;

      case types.LOAD_SENATE_CANDIDATES:
        // draft.senateCandidates = false;
        break;

      case types.LOAD_SENATE_CANDIDATES_SUCCESS:
        draft.senateCandidates = action.senateCandidates;
        break;

      case types.LOAD_SENATE_CANDIDATES_ERROR:
        draft.senateCandidates = false;
        break;

      case types.GEOLOCATION_TO_DISTRICT:
        draft.geoLocation = false;
        draft.geoError = false;
        break;

      case types.GEOLOCATION_TO_DISTRICT_SUCCESS:
        draft.geoLocation = action.geoLocation;
        draft.geoError = false;
        break;

      case types.GEOLOCATION_TO_DISTRICT_ERROR:
        draft.geoLocation = false;
        draft.geoError = action.error;
        break;

      case types.USERSS_COUNT:
        draft.userCounts = false;
        break;

      case types.USERS_COUNTS_SUCCESS:
        draft.userCounts = action.userCounts;
        break;

      case types.LOAD_BLOC_CANDIDATE_SUCCESS:
        draft.blocCandidate = action.blocCandidate;
        break;

      case types.CLEAR_BLOC_CANDIDATE:
        draft.blocCandidate = false;
        break;

      case types.SET_JOIN_CANDIDATE:
        draft.joinCandidate = action.joinCandidate;
        break;

      case types.CLEAR_JOIN_CANDIDATE:
        draft.joinCandidate = false;
        break;

      case types.SET_GROW_CANDIDATE:
        draft.growCandidate = action.growCandidate;
        break;

      case types.CLEAR_GROW_CANDIDATE:
        draft.growCandidate = false;
        break;
    }
  });

export default zipFinderPageReducer;
