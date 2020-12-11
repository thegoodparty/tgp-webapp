import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the allCandidatesToScrape state domain
 */

const selectAllCandidatesToScrapeDomain = state =>
  state.allCandidatesToScrape || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AllCandidatesToScrape
 */

const makeSelectAllCandidatesToScrape = () =>
  createSelector(
    selectAllCandidatesToScrapeDomain,
    substate => substate,
  );

export default makeSelectAllCandidatesToScrape;
export { selectAllCandidatesToScrapeDomain };
