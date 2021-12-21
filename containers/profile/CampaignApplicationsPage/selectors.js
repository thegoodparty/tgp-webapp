import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaignApplicationsPage state domain
 */

const selectCampaignApplicationsPageDomain = state =>
  state.campaignApplicationsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CampaignApplicationsPage
 */

const makeSelectCampaignApplicationsPage = () =>
  createSelector(
    selectCampaignApplicationsPageDomain,
    substate => substate,
  );

export default makeSelectCampaignApplicationsPage;
export { selectCampaignApplicationsPageDomain };
