import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the faqArticlePage state domain
 */

const selectFaqArticlePageDomain = state => state.faqArticlePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FaqArticlePage
 */

const makeSelectFaqArticlePage = () =>
  createSelector(selectFaqArticlePageDomain, substate => substate);

export default makeSelectFaqArticlePage;
export { selectFaqArticlePageDomain };
