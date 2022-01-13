/*
 *
 * CampaignApplicationsPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  application: false,
  reviewMode: false,
};

/* eslint-disable default-case, no-param-reassign */
const applicationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_APPLICATION:
        draft.loading = true;
        draft.application = false;
        draft.reviewMode = false;
        break;
      case types.LOAD_APPLICATION_SUCCESS:
        draft.loading = false;
        draft.application = action.application;
        draft.reviewMode = action.reviewMode;
        break;
    }
  });

export default applicationPageReducer;
