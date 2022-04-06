import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTopIssuesPage state domain
 */

const selectAdminTopIssuesPageDomain = state => state.adminTopIssuesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminTopIssuesPage
 */

const makeSelectAdminTopIssuesPage = () =>
  createSelector(selectAdminTopIssuesPageDomain, substate => substate);

export default makeSelectAdminTopIssuesPage;
export { selectAdminTopIssuesPageDomain };
