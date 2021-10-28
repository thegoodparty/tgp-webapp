import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topIssuesPage state domain
 */

const selectTopIssuesPageDomain = state => state.topIssuesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopIssuesPage
 */

const makeSelectTopIssuesPage = () =>
  createSelector(
    selectTopIssuesPageDomain,
    substate => substate,
  );

export default makeSelectTopIssuesPage;
export { selectTopIssuesPageDomain };
