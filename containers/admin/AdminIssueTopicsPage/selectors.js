import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminIssueIssueTopicsPage state domain
 */

const selectAdminIssueTopicsPageDomain = state =>
  state.adminIssueTopicsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminIssueIssueTopicsPage
 */

const makeSelectAdminIssueTopicsPage = () =>
  createSelector(
    selectAdminIssueTopicsPageDomain,
    substate => substate,
  );

export default makeSelectAdminIssueTopicsPage;
export { selectAdminIssueTopicsPageDomain };
