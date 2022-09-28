/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  homepageCandidates: false,
  loading: false,
  error: false,
  fullFeed: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_HOMEPAGE_CANDIDATES_SUCCESS:
        draft.homepageCandidates = action.candidates;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_HOMEPAGE_CANDIDATES_ERROR:
        draft.homepageCandidates = false;
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.LOAD_FEED:
        draft.fullFeed = false;
        draft.loading = true;
        break;

      case types.LOAD_FEED_SUCCESS:
        draft.fullFeed = action.fullFeed;
        draft.loading = false;
        break;
    }
  });

export default homePageReducer;
