import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the incumbentsPage state domain
 */

const selectIncumbentsPageDomain = state =>
  state.incumbentsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IncumbentsPage
 */

const makeSelectIncumbentsPage = () =>
  createSelector(
    selectIncumbentsPageDomain,
    substate => substate,
  );

export default makeSelectIncumbentsPage;
export { selectIncumbentsPageDomain };
