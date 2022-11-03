import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blogHomePage state domain
 */

const selectBlogHomePageDomain = state => state.blogHomePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlogHomePage
 */

const makeSelectBlogHomePage = () =>
  createSelector(selectBlogHomePageDomain, substate => substate);

export default makeSelectBlogHomePage;
export { selectBlogHomePageDomain };
