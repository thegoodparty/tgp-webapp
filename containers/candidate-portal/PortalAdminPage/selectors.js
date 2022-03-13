import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the portalAdminPage state domain
 */

const selectPortalAdminPageDomain = state => state.portalAdminPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PortalAdminPage
 */

const makeSelectPortalAdminPage = () =>
  createSelector(selectPortalAdminPageDomain, substate => substate);

export default makeSelectPortalAdminPage;
export { selectPortalAdminPageDomain };
