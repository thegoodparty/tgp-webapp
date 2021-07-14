import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminUserStatsPage state domain
 */

const selectAdminUserStatsPageDomain = state =>
  state.adminUserStatsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminUserStatsPage
 */

const makeSelectAdminUserStatsPage = () =>
  createSelector(
    selectAdminUserStatsPageDomain,
    substate => substate,
  );

export default makeSelectAdminUserStatsPage;
export { selectAdminUserStatsPageDomain };
