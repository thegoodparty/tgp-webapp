import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTopicsPage state domain
 */

const selectAdminTopicsPageDomain = state =>
  state.adminTopicsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminTopicsPage
 */

const makeSelectAdminTopicsPage = () =>
  createSelector(
    selectAdminTopicsPageDomain,
    substate => substate,
  );

export default makeSelectAdminTopicsPage;
export { selectAdminTopicsPageDomain };
