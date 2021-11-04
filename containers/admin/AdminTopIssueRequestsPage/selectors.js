import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTopIssueRequestsPage state domain
 */

const selectAdminTopIssueRequestsPageDomain = state =>
  state.adminTopIssueRequestsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminTopIssueRequestsPage
 */

const makeSelectAdminTopIssueRequestsPage = () =>
  createSelector(
    selectAdminTopIssueRequestsPageDomain,
    substate => substate,
  );

export default makeSelectAdminTopIssueRequestsPage;
export { selectAdminTopIssueRequestsPageDomain };
