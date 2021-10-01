import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the creatorsPage state domain
 */

const selectFaqArticleDomain = state => state.faqArticle || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreatorsPage
 */

const makeSelectFaqArticlePage = () =>
  createSelector(
    selectFaqArticleDomain,
    substate => substate,
  );

export default makeSelectFaqArticlePage;
export { selectFaqArticleDomain };
