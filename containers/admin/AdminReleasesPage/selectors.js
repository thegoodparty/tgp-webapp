import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminReleasesPage state domain
 */

const selectAdminReleasesPageDomain = state =>
  state.adminReleasesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminReleasesPage
 */

const makeSelectAdminReleasesPage = () =>
  createSelector(
    selectAdminReleasesPageDomain,
    substate => substate,
  );

export default makeSelectAdminReleasesPage;
export { selectAdminReleasesPageDomain };
