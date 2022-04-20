/*
 *
 * CampaignApplicationsPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  applications: false,
  staff: false,
};

/* eslint-disable default-case, no-param-reassign */
const campaignApplicationsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_APPLICATIONS:
        draft.loading = true;
        draft.applications = false;
        break;
      case types.LOAD_APPLICATIONS_SUCCESS:
        draft.loading = false;
        draft.applications = action.applications;
        break;

      case types.LOAD_STAFF_SUCCESS:
        draft.staff = action.staff;
        break;
    }
  });

export default campaignApplicationsPageReducer;
