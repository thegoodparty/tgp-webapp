import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dynamicLandingPage state domain
 */

const selectDynamicLandingPageDomain = state =>
  state.dynamicLandingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DynamicLandingPage
 */

const makeSelectDynamicLandingPage = () =>
  createSelector(
    selectDynamicLandingPageDomain,
    substate => substate,
  );

export default makeSelectDynamicLandingPage;
export { selectDynamicLandingPageDomain };
