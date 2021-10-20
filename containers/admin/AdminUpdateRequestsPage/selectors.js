import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminUpdateRequestsPage state domain
 */

const selectAdminUpdateRequestsPageDomain = state =>
  state.adminUpdateRequestsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminUpdateRequestsPage
 */

const makeSelectAdminUpdateRequestsPage = () =>
  createSelector(
    selectAdminUpdateRequestsPageDomain,
    substate => substate,
  );

export default makeSelectAdminUpdateRequestsPage;
export { selectAdminUpdateRequestsPageDomain };
