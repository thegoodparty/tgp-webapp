import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the goodPracticesPage state domain
 */

const selectGoodPracticesPageDomain = state =>
  state.goodPracticesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GoodPracticesPage
 */

const makeSelectGoodPracticesPage = () =>
  createSelector(
    selectGoodPracticesPageDomain,
    substate => substate,
  );

export default makeSelectGoodPracticesPage;
export { selectGoodPracticesPageDomain };
