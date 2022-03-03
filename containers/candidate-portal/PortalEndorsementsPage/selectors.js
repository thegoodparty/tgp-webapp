import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the portalEndorsementsPage state domain
 */

const selectPortalEndorsementsPageDomain = state => state.portalEndorsementsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PortalEndorsementsPage
 */

const makeSelectPortalEndorsementsPage = () =>
  createSelector(selectPortalEndorsementsPageDomain, substate => substate);

export default makeSelectPortalEndorsementsPage;
export { selectPortalEndorsementsPageDomain };
