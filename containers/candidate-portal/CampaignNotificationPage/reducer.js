/*
 *
 * TopIssuesPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  campaignNotification: false,
};

/* eslint-disable default-case, no-param-reassign */
const campaignNotificationPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FIND_CAMPAIGN_NOTIFICATION:
        draft.loading = true;
        draft.error = false;
        break;
      case types.FIND_CAMPAIGN_NOTIFICATION_SUCCESS:
        draft.campaignNotification = action.campaignNotification;
        draft.loading = false;
        draft.error = false;
        break;
    }
  });

export default campaignNotificationPageReducer;
