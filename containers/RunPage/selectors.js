import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the runPage state domain
 */

const selectRunPageDomain = state => state.runPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RunPage
 */

const makeSelectRunPage = () =>
  createSelector(selectRunPageDomain, substate => substate);

export default makeSelectRunPage;
export { selectRunPageDomain };
