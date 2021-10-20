import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the portalCampaignManagerPage state domain
 */

const selectPortalCampaignManagerPageDomain = state =>
  state.portalCampaignManagerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PortalCampaignManagerPage
 */

const makeSelectPortalCampaignManagerPage = () =>
  createSelector(
    selectPortalCampaignManagerPageDomain,
    substate => substate,
  );

export default makeSelectPortalCampaignManagerPage;
export { selectPortalCampaignManagerPageDomain };
