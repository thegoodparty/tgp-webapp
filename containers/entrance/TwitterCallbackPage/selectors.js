import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the twitterCallbackPage state domain
 */

const selectTwitterCallbackPageDomain = state =>
  state.twitterCallbackPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TwitterCallbackPage
 */

const makeSelectTwitterCallbackPage = () =>
  createSelector(
    selectTwitterCallbackPageDomain,
    substate => substate,
  );

export default makeSelectTwitterCallbackPage;
export { selectTwitterCallbackPageDomain };
