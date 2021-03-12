/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  crewPreview: false,
  crewCount: 0,
  userSupported: false,
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CREW_PREVIEW:
        draft.loading = true;
        break;

      case types.LOAD_CREW_PREVIEW_SUCCESS:
        draft.crewPreview = action.crewPreview;
        draft.crewCount = action.crewCount;
        draft.loading = false;
        break;

      case types.LOAD_USER_SUPPORTED:
        draft.loading = false;
        draft.userSupported = false;
        break;

      case types.LOAD_USER_SUPPORTED_SUCCESS:
        draft.loading = false;
        draft.userSupported = action.userSupported;
        break;
    }
  });

export default profilePageReducer;
