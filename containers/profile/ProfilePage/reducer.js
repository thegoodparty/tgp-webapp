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
    }
  });

export default profilePageReducer;
