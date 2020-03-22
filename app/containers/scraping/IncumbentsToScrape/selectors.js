import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the incumbentsToScrape state domain
 */

const selectIncumbentsToScrapeDomain = state =>
  state.incumbentsState || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IncumbentsToScrape
 */

const makeSelectIncumbentsToScrape = () =>
  createSelector(
    selectIncumbentsToScrapeDomain,
    substate => substate,
  );

export default makeSelectIncumbentsToScrape;
export { selectIncumbentsToScrapeDomain };
