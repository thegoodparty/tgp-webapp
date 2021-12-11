import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaignNotificationPage state domain
 */

const selectCampaignNotificationPageDomain = state =>
  state.campaignNotificationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CampaignNotificationPage
 */

const makeSelectCampaignNotificationPage = () =>
  createSelector(
    selectCampaignNotificationPageDomain,
    substate => substate,
  );

export default makeSelectCampaignNotificationPage;
export { selectCampaignNotificationPageDomain };
