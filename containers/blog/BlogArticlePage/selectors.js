import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blogArticlePage state domain
 */

const selectBlogArticlePageDomain = state => state.blogArticlePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BlogArticlePage
 */

const makeSelectBlogArticlePage = () =>
  createSelector(selectBlogArticlePageDomain, substate => substate);

export default makeSelectBlogArticlePage;
export { selectBlogArticlePageDomain };
