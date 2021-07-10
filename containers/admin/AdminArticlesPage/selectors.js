import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminArticlesPage state domain
 */

const selectAdminArticlesPageDomain = state =>
  state.adminArticlesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminArticlesPage
 */

const makeSelectAdminArticlesPage = () =>
  createSelector(
    selectAdminArticlesPageDomain,
    substate => substate,
  );

export default makeSelectAdminArticlesPage;
export { selectAdminArticlesPageDomain };
