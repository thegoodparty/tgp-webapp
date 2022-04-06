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
  issues: false
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
      case types.LOAD_TOP_ISSUES_SUCCESS:
        draft.issues = action.issues;
        break;
    }
  });

export default applicationPageReducer;
