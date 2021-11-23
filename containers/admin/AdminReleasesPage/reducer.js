/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  releases: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminReleasesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_RELEASES_SUCCESS:
        draft.releases = action.releases;
        break;
    }
  });

export default adminReleasesPageReducer;
