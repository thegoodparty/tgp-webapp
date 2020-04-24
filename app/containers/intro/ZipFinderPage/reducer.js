/*
 *
 * ZipFinderPage reducer
 *
 */

import produce from 'immer';
import { defaultFilters } from 'helpers/electionsHelper';
import { setCookie } from 'helpers/cookieHelper';
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
  filters: defaultFilters,
  userCounts: false,
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
        draft.presidential = false;
        break;

      case types.LOAD_ALL_PRESIDENTIAL_SUCCESS:
        draft.presidential = action.presidential;
        break;

      case types.LOAD_ALL_PRESIDENTIAL_ERROR:
        draft.presidential = false;
        break;

      case types.LOAD_HOUSE_CANDIDATES:
        draft.houseCandidates = false;
        break;

      case types.LOAD_HOUSE_CANDIDATES_SUCCESS:
        draft.houseCandidates = action.houseCandidates;
        break;

      case types.LOAD_HOUSE_CANDIDATES_ERROR:
        draft.houseCandidates = false;
        break;

      case types.LOAD_SENATE_CANDIDATES:
        draft.senateCandidates = false;
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

      case types.CHANGE_FILTERS:
        setCookie('filters', JSON.stringify(action.filters));
        draft.filters = action.filters;
        break;

      case types.USERSS_COUNT:
        draft.userCounts = false;
        break;

      case types.USERS_COUNTS_SUCCESS:
        draft.userCounts = action.userCounts;
        break;
    }
  });

export default zipFinderPageReducer;
