/*
 *
 * ZipFinderPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  zipWithDistricts: false,
  presidential: false,
  districtIncumbents: false,
  districtCandidates: false,
  loading: false,
  error: false,
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

      case types.LOAD_DISTRICT_INCUMBENTS:
        draft.districtIncumbents = false;
        break;

      case types.LOAD_DISTRICT_INCUMBENTS_SUCCESS:
        draft.districtIncumbents = action.districtIncumbents;
        break;

      case types.LOAD_DISTRICT_INCUMBENTS_ERROR:
        draft.districtIncumbents = false;
        break;

      case types.LOAD_DISTRICT_CANDIDATES:
        draft.districtCandidates = false;
        break;

      case types.LOAD_DISTRICT_CANDIDATES_SUCCESS:
        draft.districtCandidates = action.districtCandidates;
        break;

      case types.LOAD_DISTRICT_CANDIDATES_ERROR:
        draft.districtCandidates = false;
        break;
    }
  });

export default zipFinderPageReducer;
