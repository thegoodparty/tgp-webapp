import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCampaignSettingsPage state domain
 */

const selectAdminCampaignSettingsPageDomain = state =>
  state.adminCampaignSettingsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCampaignSettingsPage
 */

const makeSelectAdminCampaignSettingsPage = () =>
  createSelector(
    selectAdminCampaignSettingsPageDomain,
    substate => substate,
  );

export default makeSelectAdminCampaignSettingsPage;
export { selectAdminCampaignSettingsPageDomain };
