import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the creatorsPage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreatorsPage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export { selectHomePageDomain };
