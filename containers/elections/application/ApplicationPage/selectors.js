import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the applicationPage state domain
 */

const selectApplicationPageDomain = state =>
  state.applicationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApplicationPage
 */

const makeSelectApplicationPage = () =>
  createSelector(
    selectApplicationPageDomain,
    substate => substate,
  );

export default makeSelectApplicationPage;
export { selectApplicationPageDomain };
