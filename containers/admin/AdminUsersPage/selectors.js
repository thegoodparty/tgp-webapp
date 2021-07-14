import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminUsersPage state domain
 */

const selectAdminUsersPageDomain = state =>
  state.adminUsersPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminUsersPage
 */

const makeSelectAdminUsersPage = () =>
  createSelector(
    selectAdminUsersPageDomain,
    substate => substate,
  );

export default makeSelectAdminUsersPage;
export { selectAdminUsersPageDomain };
